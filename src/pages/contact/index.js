import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import TextTrainsitions from '../../components/TextTrainsitions';
import prerender from '../../utils/prerender';
import Section from '../../components/Section';
import './index.css';
import { useRouteTransition } from '../../hooks';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { TransitionGroup, Transition } from 'react-transition-group';
import { reflow } from '../../utils/transition';
import Input from '../../components/Inputs/Input';
import { msToNum, numToMs } from '../../utils/style';
import { tokens } from '../../components/ThemeProvider/theme';
import db from '../../Firebase';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import submitEmail from './submitEmail';
const initDelay = tokens.base.durationS;


function getDelay(delayMs, initDelayMs = numToMs(0), multiplier = 1) {
    const numDelay = msToNum(delayMs) * multiplier;
    return { '--delay': numToMs((msToNum(initDelayMs) + numDelay).toFixed(0)) };
}



const Contact = () => {
    const { t, i18n } = useTranslation();


    const { status } = useRouteTransition();
    //const [inputValue, setInputValue] = useState({ name: "", email: "" });
    //const { name, email } = inputValue;
    const [ip, setIp] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('');
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
    const [ipSubmittedFormsCounter, setIpSubmittedFormsCounter] = useState("");
    const [arr, setArray] = useState([]);
    const [runArray, setRunArray] = useState(false);
    const [ipCounter, setIpCounter] = useState(0);
    const [tt, settt] = useState("");
    const [isAString, setIsAString] = useState(true);

    //const handleChange = (inputValue) => { setInputValue({ name: inputValue, email: inputValue }); console.log(inputValue); console.log(name); }
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        //console.log(res.data);
        setIp(res.data.IPv4);
    }
    const isThereAnyInt = (item) => {
        for (var i = 0; i < item.length; i++) {
            for(var n = 0; n < 10; n++) {
                console.log((item).charAt(i));
                if((item).charAt(i) === n)
                {
                    return true;
                }
            }
        }
        return false;
    }

    useEffect(() => {
        
        getData();
    })


    const addToDB = () => {
        db.collection("contactMessages").add({
            Name: name,
            Email: email,
            Message: message,
            Ip: ip

        });
        var Subject = i18next.language === 'he' ? `שלום ${name}` : `Hello ${name}`;
        var text = i18next.language === 'he' ? `קיבלתי את פנייך דרך האתר ואחזור אליך בהקדם` : `i have recieved your messeage through my website and i'll contact you asap`;

        submitEmail(email, Subject, text);
        console.log(name);
    }
    function handleChange(e) {
        console.log(e.target.value);
    }

    const onchange = () => { console.log(name); setName(name) };
    return (
        <>
            <Section className={classNames('contact', `contact--${status}`)}>
                <Helmet>
                    <title>Contact | Eliran Yihye</title>
                    <meta
                        name="description"
                        content="Send me a message if you have any business inquiries"
                    />
                </Helmet>
                {<TransitionGroup component={null}>
                    {!hasBeenSubmitted && (
                        <Transition appear mountOnEnter unmountOnExit timeout={1600} onEnter={reflow}>
                            {status => (
                                <fieldset disabled={ipCounter > 1}>
                                    <form className={classNames("contact__form", i18next.language)} method="post">
                                        <header className="contact__header">
                                            <h1>
                                                <TextTrainsitions text={t("Contactme")} start={!prerender} delay={300} />
                                            </h1>
                                        </header>
                                        <Input Value={name} onChange={(e) => setName(e.target.value)} className="input input-- name" label={t("Whatsyourname")} id="nameField" type="text" maxLength={512} error={!isAString}


                                        />
                                        <Input Value={email} onChange={(e) => setEmail(e.target.value)} className="input input--email" label={t("Whatsyouremail")} id="emailField"/>

                                        <Input Value={message} onChange={(e) => setMessage(e.target.value)} className="input input-- email" label={t("Message")} id="messageField"
                                        />

                                        <Button
                                            disabled={!name | !email | !message}
                                            variant='light'
                                            className={classNames('submitButton', `submitButton--${status}`)}
                                            onEnter={() => addToDB()} onClick={() => addToDB()}
                                        >
                                            {t("Submit")}
                                        </Button>
                                    </form>
                                </fieldset>
                            )}

                        </Transition>
                    )}

                </TransitionGroup>}
                
            </Section>
        </>

    );
};

export default Contact;
