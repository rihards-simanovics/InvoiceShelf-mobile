import * as _ from 'lodash';
import * as React from 'react';
import {View, ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import {BASE_DIR, getPath} from './cache-manager';
import {hasValue} from '@/constants';
import styles from './cache-image-style';
import {CacheImageService, IS_UNDER_PROCESSING} from './image-service';
import {colors} from '@/styles';
import {AssetImage} from '../asset-image';
import {IProps, IStates} from './type.d';

/**
 * CacheImage component that handles image caching and loading.
 */
export class CacheImage extends React.Component<IProps, IStates> {
  timer: any;
  processInterval: any;
  underProcessingCounter: number;
  _isMounted = false;
  isLoaded = false;

  constructor(props: IProps) {
    super(props);
    this.underProcessingCounter = 0;
    this.isLoaded = false;

    this.state = {
      uri: undefined,
      downloadFail: false,
      height: props?.temporaryHeight,
    };
  }

  static defaultProps = {
    findImageHeight: false,
    resizeMode: 'cover',
  };

  componentDidMount() {
    this._isMounted = true;
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.checkIsImageUriChange(nextProps);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.timer && clearTimeout(this.timer);
    this.processInterval && clearInterval(this.processInterval);
  }

  /**
   * Checks if the image URI has changed and updates the state accordingly.
   * @param {IProps} nextProps - The next props to compare against current props.
   */
  checkIsImageUriChange = async (nextProps: IProps) => {
    const {imageName, uri} = nextProps;

    if (imageName !== this.props.imageName) {
      const path = await getPath(uri, imageName, this._isMounted);
      this.setFileUri(path, uri);
    }
  };

  /**
   * Loads the image from the given URI.
   * @param {IProps} props - The props containing the image URI and name.
   */
  async load({uri, imageName}: IProps): Promise<void> {
    if (!uri) return;

    try {
      const path = await getPath(uri, imageName, this._isMounted);
      this._isMounted && this.setFileUri(path, uri);
    } catch (e) {
      // Handle error if necessary
    }
  }

  /**
   * Sets the file URI in the component state.
   * @param {string} path - The path of the image.
   * @param {string} uri - The original URI of the image.
   */
  setFileUri = (path: string, uri: string) => {
    let filePath = uri;

    if (path && path === IS_UNDER_PROCESSING) {
      this.handleImageUnderProcess();
      return;
    }

    if (path && !path.includes('http')) {
      filePath = path;
    }

    setTimeout(() => this.setState({uri: filePath}), 30);
  };

  /**
   * Checks if the image is currently under processing.
   */
  checkImageIsUnderProcessing = async () => {
    try {
      // Increment the counter for processing time
      this.underProcessingCounter += 1;

      // If it takes more than 4 seconds, reset the state
      if (this.underProcessingCounter >= 12) {
        this.setState({uri: this.props.uri});
        this.processInterval && clearInterval(this.processInterval);
        CacheImageService.removeImage(this.props.imageName);
        this.underProcessingCounter = 0;
        return;
      }

      const {imageName} = this.props;
      const path: string = `${BASE_DIR}${imageName}`;

      const isUnderProcess = await CacheImageService.isUnderProcess(imageName);

      if (!isUnderProcess) {
        setTimeout(() => this.setState({uri: path}), 30);
        this.processInterval && clearInterval(this.processInterval);
        CacheImageService.removeImage(this.props.imageName);
        this.underProcessingCounter = 0;
      }
    } catch (e) {
      this.underProcessingCounter = 0;
    }
  };

  /**
   * Handles the case when the image is under processing.
   */
  handleImageUnderProcess = () => {
    try {
      this.processInterval = setInterval(this.checkImageIsUnderProcessing, 350);
    } catch (e) {
      // Handle error if necessary
    }
  };

  render() {
    const {
      style,
      imageProps,
      onPress,
      findImageHeight,
      buttonStyle,
      minHeight,
      minHeightStyle,
      temporaryHeight,
      loadingProps,
      loaderStyle,
      resizeMode = 'cover',
      theme,
    } = this.props;

    const {uri, downloadFail, height} = this.state;

    const imageStyle: any = [
      styles.image(theme),
      style,
      findImageHeight && {height},
      findImageHeight && height === minHeight && minHeightStyle,
    ];

    const loaderProps: any = {
      onLoadEnd: () => (this.isLoaded = true),
    };

    const loader = (
      <ActivityIndicator
        size={'small'}
        color={colors.primary}
        style={[
          styles.loader(theme),
          findImageHeight && {height},
          style,
          loaderStyle,
        ]}
        {...loadingProps}
      />
    );

    const children = (
      <View style={style}>
        {loader}

        {downloadFail && (
          <Image
            source={{uri: this.props.uri}}
            style={imageStyle}
            resizeMode={resizeMode}
            fadeDuration={0}
            {...loaderProps}
            {...imageProps}
            defaultSource={AssetImage.images.logo_dark}
          />
        )}

        {!downloadFail && hasValue(uri) && (
          <Image
            source={{uri}}
            style={imageStyle}
            resizeMode={resizeMode}
            fadeDuration={0}
            onError={({nativeEvent}) => {
              !downloadFail && this.setState({downloadFail: true});
            }}
            {...loaderProps}
            {...imageProps}
          />
        )}
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            this.isLoaded &&
            onPress?.({
              height,
              uri,
              originalUrl: this.props.uri,
            })
          }
          style={[
            {flex: 1},
            findImageHeight && {minHeight: temporaryHeight},
            buttonStyle,
          ]}
        >
          {children}
        </TouchableOpacity>
      );
    }

    return children;
  }
}
