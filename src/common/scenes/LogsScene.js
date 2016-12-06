import React, {PropTypes, Component} from 'react';
import {InteractionManager} from 'react-native';
import {
    Container,
    Header,
    Content,
    Title,
    List,
    ListItem,
    Text,
    Button,
    Icon
} from 'native-base';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import Preloader from '../Components/Preloader';
import logFormatter from '../../utils/logFormatter';

class LogsScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logEntries: null
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            BackgroundGeolocation.getLogEntries(100, logEntries => {
                this.setState({logEntries: logFormatter(logEntries)});
            });
        });
    }

    renderContent(logEntries) {
        return (
            <List dataArray={logEntries} renderRow={(entry) => <ListItem style={{
                backgroundColor: entry.style.backgroundColor
            }}>
                <Text style={{
                    color: entry.style.color
                }}>{entry.text}</Text>
            </ListItem>}></List>
        );
    }

    render() {
        const logEntries = this.state.logEntries;
        return (
            <Container>
                <Header>
                    <Button transparent onPress={this.props.onBack}>
                        <Icon name='ios-arrow-back'/>
                    </Button>
                    <Title>Logs</Title>
                </Header>
                <Content>
                    {(() => {
                        if (logEntries)
                            return this.renderContent(logEntries);
                        return <Preloader/>;
                    })()}
                </Content>
            </Container>
        );
    }
}

export default LogsScene;