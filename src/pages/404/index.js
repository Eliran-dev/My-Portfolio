import { Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { Transition } from "react-transition-group";
import { Helmet } from "react-helmet";
import './index.css';
import { useHistory, Route, Redirect, Router } from "react-router-dom";
import { lazy } from "react";
import { useTranslation } from "react-i18next";


const HomePage = lazy(() => import('../home'));

const NotFoundPage = () => {
    const [seconds, setSeconds] = useState(5);
    const { t } = useTranslation();
    const history = useHistory();


    
    useEffect(() => {
        const intervalID = setInterval(() => {
            console.log(seconds === 1);
            if (seconds === 0) {
               history.push('/');


            }
            if (seconds >= 0) {
                setSeconds(seconds - 1);
            }
            else {
                <Route
                    exact
                    path="#intro"
                    render={() => {
                        return (
                            <Redirect push to={HomePage} />
                        )
                    }}
                />
            }
        }, 1000);
        return () => clearInterval(intervalID);
    })

    return (
        <section className="page-404">
            <Helmet>
                <title tag="title">404 | Not Found</title>
            </Helmet>
            <Fragment>

                <h1>
                     {t("page404")} 
                     {seconds}
                </h1>
            </Fragment>
        </section>
    );
};

export default NotFoundPage;