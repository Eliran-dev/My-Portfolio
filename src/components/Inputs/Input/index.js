import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';
import { useId } from '../../../hooks';
import { msToNum, numToPx } from '../../../utils/style';
import { isVisible } from '../../../utils/transition';
import { tokens } from '../../ThemeProvider/theme';
import './index.css';
const Input = ({id,label,text,error, onBlur, onChange, type,Value, onfocusout, ...rest}) => {



    //const InputElement = multiline ? TextArea : 'input';
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");
    const generatedId = useId();
    const errorRef= useRef();
    const inputId = id || `input-${generatedId}`;
    const errorId = `${inputId}-error`;
    const handleBlur = event => {
        setFocused(false);
    
        if (onBlur) {
          onBlur(event);
        }
      };
      const handleChange = (e) => {
        const { value } = e.target;
        setValue(value);
      };
    return (
        <div className="input__container">
            <div className="input__Content">
        <label
          className={classNames('input__label', {
            'input__label--focused': focused,
            'input__label--has-value': !!Value,
          })}
          for={id}
                  >
            {label}
            </label>
        <input 
        className="input__field"
         value={Value}
         onFocus={() => setFocused(true)}
         onBlur={handleBlur}
         label={label}
         onChange={onChange}
         type={type}
         aria-labelledby={label}
        id={id}
         />
        <div
          className={classNames('input__underline', {
            'input__underline--focused': focused,
          })}
        />
        </div>
        <TransitionGroup component={null}>
        {!!error && (
          <Transition timeout={msToNum(tokens.base.durationM)}>
            {status => (
              <div
                className={classNames('input__error', `input__error--${status}`)}
                id={errorId}
                role="alert"
                style={{
                  '--height': isVisible(status)
                    ? numToPx(errorRef.current?.getBoundingClientRect().height)
                    : '0px',
                }}
              >
                <div className="input__error-message" ref={errorRef}>
                  {/* <Icon icon="error" /> */}
                  {"error"}
                </div>
              </div>
            )}
          </Transition>
        )}
      </TransitionGroup>
        </div>
    );
};

export default Input;
