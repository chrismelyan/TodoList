import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";
import App from "./App";

export default {
    title: 'TODOLIST/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />;

export const AppExample = Template.bind({});

