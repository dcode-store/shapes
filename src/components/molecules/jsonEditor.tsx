// @ts-nocheck

import React, { Component } from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

export default class ReactJsonEditor extends Component {
    componentDidMount() {
        const options = {
            mode: this.props.mode || 'tree',
            modes: this.props.allowedModes || ['code', 'tree'],
            onChange: () => this.props.onChange(this.jsoneditor.get()),
            onError: this.props.onError,
            ace: this.props.ace,
            theme: this.props.theme || "ace/theme/github",
            autocomplete: {
                enable: this.props.enableLiveAutocompletion || false
            }
        };

        this.jsoneditor = new JSONEditor(this.container, options);
        this.jsoneditor.set(this.props.json);
    }

    componentWillUnmount() {
        if (this.jsoneditor) {
            this.jsoneditor.destroy();
        }
    }

    componentDidUpdate() {
        this.jsoneditor.update(this.props.json);
    }

    render() {
        return (
            <div className="jsoneditor-react-container" ref={elem => this.container = elem} />
        );
    }
}