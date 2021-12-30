import { Suspense, lazy, useEffect, useState, Fragment } from 'react';
import classNames from 'classnames';
import { TransitionGroup, Transition } from 'react-transition-group';
import { useInterval, usePrevious, useWindowSize } from '../../hooks';
import { useTheme } from '../../components/ThemeProvider';
import Section from '../../components/Section';
import prerender from '../../utils/prerender';
import { reflow } from '../../utils/transition';
import TextTrainsitions from '../../components/TextTrainsitions';
import VisuallyHidden from '../../components/VisuallyHidden';
import Header from '../../components/Header';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import TypewriterComponent from 'typewriter-effect';
import '../../i18n';
import './intro.css';

const IntroBackground = lazy(() => import('../../components/IntercativeBackgrounds/Intro'));

function Intro({ id, sectionRef, disciplines, scrollIndicatorHidden, ...rest }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const windowSize = useWindowSize();
  const prevTheme = usePrevious(theme);
  const [introduction1, setIntroduction1] = useState("");
  const [oMOTextTransition, setOMOTextTransition] = useState(false);  //oMO stands for on mouse over 
  const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
    ', and '
  );
  const currentDisciplines = disciplines.filter(
    (item, index) => index === disciplineIndex
  );
  const titleId = `${id}-title`;

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme.themeId
  );
  useEffect(() => {
    setIntroduction1(t("introduction1"));

    if (prevTheme && prevTheme.themeId !== theme.themeId) {
      setDisciplineIndex(0);
    }
  }, [theme.themeId, prevTheme]);

  return (
    <Section
      classNames="intro"
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >

      <Transition
        key={theme.themeId}
        appear={!prerender}
        in={!prerender}
        timeout={3000}
        onEnter={reflow}
      >
        {status => (
          <Fragment>

            {!prerender && (
              <Suspense fallback={null}>
                {/* <IntroBackground className="introCanvas" /> */}
              </Suspense>
            )}

             <h1
              className={classNames('intro__name', `intro__name--${status}`)}
            >
              <TextTrainsitions className="introduction" text={t("EliranYihye")} start={!prerender || oMOTextTransition} delay={300} onMouseEnter={() => setOMOTextTransition(true)} />

            </h1> 
            <h1
              className={classNames('intro__name', `intro__name--${status}`)}
            >
              <TextTrainsitions className="introduction" text={t("Webandmobiledeveloper")} start={!prerender || oMOTextTransition} delay={300} onMouseEnter={() => setOMOTextTransition(true)} />

            </h1> 
            <div className="bottomSignature fixed-bottom">
              {/* <header className="intro__text">
                <h1
                  className={classNames('intro__name', `intro__name--${status}`)}
                  id={titleId}
                >
                  <TextTrainsitions text={t("EliranYihye")} start={!prerender || oMOTextTransition} delay={300} onMouseEnter={() => setOMOTextTransition(true)} />
                </h1>
              </header> */}

              {/* <Header disciplines={disciplines} HeadingWord="Programmer"></Header> */}
            </div>
          </Fragment>

        )}
      </Transition>

    </Section>
  );
};
export default Intro;