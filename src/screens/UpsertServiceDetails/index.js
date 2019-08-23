import React, { Component } from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  View,
  StyleSheet
} from "react-native";

import { Block, Text, Icon, Card, Button } from "../../components";
import * as theme from "../../constants/theme";
import ServiceDetailsInfo from "./ServiceDetailsInfo";
import ServiceDetailsPrice from "./ServiceDetailsPrice";
import UploadServiceDetailsImage from "./ServiceDetailsImage";
import { validateInput } from "../../utils/inputFunctions";
import { marketplaceStatus } from "../../modules/marketPlace/reducers";
import { serviceDetailsStatus } from "../../modules/serviceDetails/reducers";
const { width } = Dimensions.get("window");

class UpsertServiceDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeftContainerStyle: {
      paddingLeft: 24
    },
    headerRightContainerStyle: {
      paddingRight: 24
    },
    headerLeft: (
      <TouchableOpacity onPress={navigation.openDrawer}>
        <Icon menu />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity>
        <Icon notification />
      </TouchableOpacity>
    ),
    headerTitle: (
      <Block row middle>
        <Text h4>Overview</Text>
      </Block>
    )
  });

  constructor(props, context) {
    super(props);
    this.scrollView;
    const item = this.props.navigation.getParam("item", {});
    const edit = Object.keys(item).length > 0;
    const {
      delivery,
      description,
      price,
      serviceName,
      uploadedImageArray
    } = item;
    this.state = {
      currentIndex: 0,
      formError: false,
      edit,
      errorMessage: "",
      fields: {
        serviceName: {
          value: edit ? serviceName : "",
          error: edit ? false : true,
          errorMessage: "",
          rules: {
            maxLength: 100,
            minLength: 3
          }
        },
        description: {
          value: edit ? description : "",
          error: edit ? false : true,
          errorMessage: "",
          rules: {
            maxLength: 40,
            minLength: 3
          }
        },
        price: {
          value: edit ? price.toString() : "",
          error: edit ? false : true,
          errorMessage: "",
          rules: {
            price: true
          }
        },
        delivery: {
          value: edit ? 'false' : "",
          error: edit ? false : true,
          errorMessage: "",
          rules: {
            required: false
          }
        },
        uploadedImageArray: {
          error: edit ? false : true,
          errorMessage: "",
          value: edit ? uploadedImageArray : [],
          rules: {
            maxLength: 5,
            minLength: 1
          }
        }
      }
    };
  }

  onScroll = event => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / width);
    if (this.state.currentIndex !== currentIndex) {
      this.setState({ currentIndex });
    }
  };

  handleChange = type => text => {
    let newState = { ...this.state };
    newState.fields[type] = {
      ...newState.fields[type],
      value: text,
      error: false,
      errorMessage: ""
    };

    this.setState(prevState => ({
      ...prevState,
      ...newState,
      formError: false,
      errorMessage: ""
    }));
  };

  blurReact = ({ error, errorMessage, type }) => {
    let newState = { ...this.state };
    newState.fields[type] = { ...newState.fields[type], error, errorMessage };

    this.setState(prevState => ({
      ...prevState,
      ...newState
    }));
  };

  handleSubmit = event => {
    const {
      requestAddServiceDetailsAction,
      requestEditServiceDetailsAction,
      navigation
    } = this.props;
    let item = navigation.getParam("item", {});
    const marketPlaceId = navigation.getParam("marketPlaceId");

    var { error, errorMessage } = validateInput(this.state.fields);
    if (error) {
      return this.setState({
        formError: true,
        errorMessage: "Some of your input is empty or invalid"
      });
    }

    let dataToSubmit = {};
    Object.keys(this.state.fields).map(el => {
      dataToSubmit[el] = this.state.fields[el].value;
    });

    if (this.state.edit) {
      return requestEditServiceDetailsAction({
        dataToSubmit: {
          ...item,
          ...dataToSubmit
        },
        _id: item._id,
        navigation,
        navigateTo: "ServiceDetailsInfo"
      });
    }

    requestAddServiceDetailsAction({
      dataToSubmit: {
        ...dataToSubmit,
        delivery: false,
        marketPlaceId
      },
      navigation,
      navigateTo: "ServiceDetailsInfo"
    });
  };

  nextForm = () => {
    const { currentIndex } = this.state;
    if (currentIndex === 2) this.handleSubmit();
    const newIndex = currentIndex <= 1 ? currentIndex + 1 : currentIndex;

    this.scrollView.scrollTo({
      x: newIndex * width,
      animated: true
    });

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex <= 2 ? newIndex : 3
    }));
  };

  prevForm = () => {
    const newIndex = this.state.currentIndex - 1;

    this.scrollView.scrollTo({
      x: newIndex * width,
      animated: true
    });

    this.setState(prevState => ({
      currentIndex: prevState.currentIndex >= 0 ? newIndex : 0
    }));
  };

  render() {
    const {
      requestImageUploadAction,
      requestRemoveImageUploadAction,
      imageUploadLoading,
      deletedPublicId,
      imageUploadUrl,
      addServiceDetailsLoading,
      addServiceDetailsRequest,
      imageUploadError,
      imageUploadRequest
    } = this.props;

    return (
      <SafeAreaView style={styles.overview}>
        <ScrollView>
          <Card row middle style={styles.margin}>
            <Block flex={1.2} center middle style={{ marginRight: 20 }}>
              <Text light height={43} size={36} spacing={-0.45}>
                86
              </Text>
              <Text
                ligth
                caption
                center
                style={{ paddingHorizontal: 16, marginTop: 3 }}>
                OPERATING SCORE
              </Text>
            </Block>
            <Block>
              <Text paragraph color="black3">
                All cars are operating well. There were 1,233 trips since your
                last login.
              </Text>
            </Block>
          </Card>
          <ScrollView
            horizontal
            pagingEnabled
            scrollEnabled
            ref={ref => (this.scrollView = ref)}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            snapToAlignment="center"
            onScroll={this.onScroll}
            style={{ flex: 1 }}>
            <ServiceDetailsInfo
              styles={styles}
              handleChange={this.handleChange}
              inputInfo={this.state.fields}
              blur={arg => this.blurReact(arg)}
            />
            <ServiceDetailsPrice
              styles={styles}
              handleChange={this.handleChange}
              inputInfo={this.state.fields}
              blur={arg => this.blurReact(arg)}
            />
            <UploadServiceDetailsImage
              requestImageUploadAction={requestImageUploadAction}
              requestRemoveImageUploadAction={requestRemoveImageUploadAction}
              handleChange={this.handleChange}
              imageUploadRequest={imageUploadRequest}
              imageUploadLoading={imageUploadLoading}
              imageUploadUrl={imageUploadUrl}
              deletedPublicId={deletedPublicId}
              formError={this.state.formError}
              imageUploadError={imageUploadError}
              inputInfo={this.state.fields}
              blur={arg => this.blurReact(arg)}
            />
          </ScrollView>
        </ScrollView>
        <View style={{ backgroundColor: theme.colors.white }}>
          {this.state.formError && (
            <View>
              <Text style={{ textAlign: "center", color: "red" }}>
                {this.state.errorMessage}
              </Text>
            </View>
          )}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: theme.sizes.base
            }}>
            <Button
              onPress={this.prevForm}
              style={{
                backgroundColor: theme.colors.shadow,
                width: "40%",
                marginRight: theme.sizes.base
              }}>
              <Text>Prev</Text>
            </Button>
            <Button
              style={{ width: "40%" }}
              onPress={this.nextForm}
              isLoading={
                addServiceDetailsRequest ===
                  serviceDetailsStatus.addServiceDetails &&
                addServiceDetailsLoading
              }>
              <Text>{this.state.currentIndex == 2 ? "Submit" : "Next"}</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.colors.white
  },
  card: {
    padding: 20,
    borderRadius: theme.sizes.radius,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
    marginBottom: theme.sizes.base,
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  },
  active: {
    borderColor: theme.colors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.lightblue,
    shadowRadius: 3,
    shadowOpacity: 1
  },
  icon: {
    flex: 0,
    height: 48,
    width: 48,
    borderRadius: 48,
    marginBottom: 15,
    backgroundColor: theme.colors.lightblue
  },
  check: {
    position: "absolute",
    right: 9,
    top: 9
  }
});

export default UpsertServiceDetails;
