import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransitionGroup } from 'react-transition-group';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Section from '../../../components/Section';
import Input from '../../../components/Inputs/Input';
import mailToKindle from './mailToKindle';
import './index.css';

const KindleMailer = () => {
    const { t, i18n } = useTranslation();
    const [kindleEmail, setKindleEmail] = useState(localStorage.getItem("kindleEmail") != null ? localStorage.getItem("kindleEmail") : "");
    const [subject, setSubject] = useState("");
    const [link, setLink] = useState("");
    const [label, setLabel] = useState("");

    const [disabled, setDisabled] = useState(false);

    const mailKindle = () => {
        mailToKindle(kindleEmail,subject,link,label);
    }

    return(
        <>
        <Section className="kindleMailer">

            <Helmet>
                <title>Kindle Mailer</title>
                <meta
                    name="kindle mailer"
                    content="mail an article or a book to your kindle"
                />
            </Helmet>
            {<TransitionGroup>
                <header className="kindleMailer_header">
                    <h1>{t("kindleMailer.mailyourkindle")}</h1>
                        
                        </header>

<div className="formkindle">
                <fieldset className="form">
                    <Input Value={kindleEmail} onChange={(e) => setKindleEmail(e.target.value)} label={t("kindleMailer.inputkindlemail")} type="text" />
                    <Input Value={subject} onChange={(e) => setSubject(e.target.value)} className="input input-- name" label={t("kindleMailer.inputsubject")} type="text" />
                    <Input Value={link} onChange={(e) => setLink(e.target.value)} label={t("kindleMailer.inputlink")} type="text" />
                    <Input Value={label} onChange={(e) => setLabel(e.target.value)} label={t("kindleMailer.inputlabel")} type="text" />
                    <Button disabled={!kindleEmail || !link} variant="secondary" onClick={() => mailKindle()}> Submit </Button>
                </fieldset>
</div>

                </TransitionGroup>}
                
            </Section>
            </>
    );

};

export default KindleMailer;