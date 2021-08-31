import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { AssetImage } from '../AssetImage';
import { CtGradientButton } from '../Button';
import t from 'locales/use-translation';
import { checkConnection } from '@/constants';
import { goBack, MOUNT, UNMOUNT, ROUTES } from '@/navigation';
import { IMAGES } from '@/assets';
import { Text } from '../Text';
import { styles, Container } from './styles';
import { commonSelector } from 'modules/common/selectors';

export class LostConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        goBack(MOUNT, navigation, { route: ROUTES.LOST_CONNECTION });
    }

    componentWillUnmount() {
        goBack(UNMOUNT);
    }

    onRetry = async () => {
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);

        const { navigation } = this.props;

        let isConnected = await checkConnection();
        !isConnected
            ? navigation.navigate(ROUTES.LOST_CONNECTION)
            : navigation.pop();
    };

    render() {
        const { theme } = this.props;
        const { loading } = this.state;

        return (
            <Container>
                <View style={styles.main}>
                    <View style={styles.bodyContainer}>
                        <Text
                            bold2
                            h3
                            style={styles.title}
                            color={theme?.text?.secondaryColor}
                        >
                            {t('lostInternet.title')}
                        </Text>

                        <View style={styles.logoContainer}>
                            <AssetImage
                                imageSource={IMAGES.LOST_CONNECTION}
                                imageStyle={styles.imgLogo}
                            />
                        </View>

                        <Text
                            light
                            center
                            style={styles.description}
                            color={theme?.text?.thirdColor}
                        >
                            {t('lostInternet.description')}
                        </Text>
                    </View>

                    <View style={{ marginTop: 25 }}>
                        <CtGradientButton
                            onPress={() => this.onRetry()}
                            btnTitle={t('button.retry')}
                            loading={loading}
                            style={{ paddingVertical: 8 }}
                        />
                    </View>
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    ...commonSelector(state)
});

const LostConnectionContainer = connect(mapStateToProps)(LostConnection);

LostConnectionContainer.navigationOptions = () => ({
    header: null
});

export default LostConnectionContainer;
