import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TODOLIST/Add Item Form',
    component: AddItemForm,
    argTypes: {
        callbackAddValue: {
            description: 'callback'
        }
    }
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) =>
    <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
    callbackAddValue: action('Button has been clicked')
}
