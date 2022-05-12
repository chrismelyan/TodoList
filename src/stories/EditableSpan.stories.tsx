import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import EditableSpan from "../components/EditableSpan/EditableSpan";

export default {
    title: 'TODOLIST/Editable Span',
    component: EditableSpan,
    argTypes: {
        callbackUpdate: {description: 'callback'},
    }
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) =>
    <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    callbackUpdate: action('EditableSpan Value has been changed'),
    value: "Hello world"
}
