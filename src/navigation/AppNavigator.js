import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Screens from "./Screens";
import Auth from "./Auth";
import FeedbackContainer from "../containers/FeedbackContainer";

// Loading screen

export default createAppContainer(
	createSwitchNavigator({
		// You could add another route here for authentication.
		// Read more at https://reactnavigation.org/docs/en/auth-flow.html
		Auth,
		Feedback: FeedbackContainer,
		Main: Screens
	})
);
