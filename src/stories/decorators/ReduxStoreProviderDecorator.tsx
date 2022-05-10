import React from 'react';
import {Provider} from "react-redux";
import {Story} from "@storybook/react";
import {store} from "../../store/store";

export const ReduxStoreProviderDecorator = (StoryFn: Story) => {
    return <Provider store={store}><StoryFn/></Provider>
}