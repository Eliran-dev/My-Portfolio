import { useState, useEffect, Fragment,  memo } from "react";
import VisuallyHidden from "../VisuallyHidden";
import classNames from 'classnames';
import prerender from "../../utils/prerender";
import { TransitionGroup, Transition } from 'react-transition-group';
import { tokens } from "../ThemeProvider/theme";
import { useTheme } from "../ThemeProvider";
import { reflow } from "../../utils/transition";
import { useInterval, usePrevious, useWindowSize } from '../../hooks';

import './index.css';

const Header = (disciplines, HeadingWord) => {
    const disc = ['Developer', 'Creator', 'Animator', 'Illustrator', 'Musician'];

    const theme = useTheme();
    const prevTheme = usePrevious(theme);
    var num =0;
    console.log(disciplines);
    console.log(HeadingWord);
    const [disciplineIndex, setDisciplineIndex] = useState(1);
    const introLabels = [disc.slice(0, -1).join(', '), disc.slice(-1)[0]].join(
        ', and '
      ); 
      console.log(disc);
         const currentDisciplines = disc.filter(
        (title, index) => index === disciplineIndex
      );
      useInterval(
        () => {
            disciplineIndex === disc.length-1 ?
            setDisciplineIndex(0)
            :
            setDisciplineIndex(disciplineIndex + 1) 

        },
        5000,
        theme.themeId
      );
    
      useEffect(() => {
        if (prevTheme && prevTheme.themeId !== theme.themeId) {
          setDisciplineIndex(0);
        }
      }, [theme.themeId, prevTheme]);
      return (
        <Transition
        key={theme.themeId}
        appear={!prerender}
        in={!prerender}
        timeout={3000}
        onEnter={reflow}
      >
          {status => (
        <Fragment>
                        {/* {!prerender && (
              <Suspense fallback={null}>
                <DisplacementSphere />
              </Suspense>
            )} */}
          <VisuallyHidden className="intro__title-label">{`Programmer +' ${introLabels}`} </VisuallyHidden>
          <span
          aria-hidden
          className={classNames('intro__title-row', {
            'intro__title-row--hidden': prerender,
          })}
        >
          <span
            className={classNames(
              'intro__title-word',
              `intro__title-word--${status}`
            )}
            style={{ '--delay': tokens.base.durationXS }}
          >
            Programmer
          </span>
          <span
                    className={classNames(
                      'intro__title-line',
                      `intro__title-line--${status}`
                    )}
                  />
          </span>
          <TransitionGroup 
          className={classNames(
              'intro__title-row,', {
              'intro__title-row--hidden' : prerender,
          })}
          component="span"
          >
              {currentDisciplines.map(title => (
                  <Transition
                  appear
                  timeout={{ enter: 3000, exit: 2000 }}
                  key={title}
                  onEnter={reflow}
                  >
                      {titleStatus => (
                          <span
                          
                          aria-hidden
                          className={`intro__title-status--${titleStatus}`}
                          style={{ '--delay': tokens.base.durationL }}
                          
                          >
                              + {title}
                          </span>
                      )}
                  </Transition>
              ))}
              
              
          </TransitionGroup>
          </Fragment>
          )}
          </Transition>
          );
    
}


export default memo(Header);