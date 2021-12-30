import classNames from 'classnames';
import React from 'react';

const TextField = (focused,label,text) => {
    //const InputElement = multiline ? TextArea : 'input';

    return (
        <div
        className="input"
        >
            <div className="input__content">
                <label
                className={classNames('input_label', {
                    'input__label--focused' : focused,
                })}
                >
                    {label}
                </label>
                <textarea>
                {text}
                </textarea>

            </div>
            
        </div>
    );
};

export default TextField;
