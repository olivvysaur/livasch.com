import React from 'react';

import siteConfig from '../siteconfig.json';

import Link from './Link';
import { Row, FlexibleSpacer } from './Layout';

import styles from '../styles/Header.module.scss';

const Header = () => (
  <div className={styles.wrapper}>
    <header className={styles.content}>
      <Row gridGap={16} alignItems='center' flexWrap='wrap' wrapSpacing={16}>
        <Row gridGap={12} alignItems='center'>
          <img
            src='/logo.svg'
            height={48}
            width={48}
            alt='A red hair bow tilted at an angle'
          />
          <Link href='/'>
            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {siteConfig.title}
            </span>
          </Link>
        </Row>

        <FlexibleSpacer />

        <Row gridGap={32}>
          <Link href='/[slug]' as='/about'>
            About
          </Link>
          <Link href='/links'>Links</Link>
          <Link href='/archive'>Archive</Link>
        </Row>
      </Row>
    </header>
  </div>
);

Header.displayName = 'Header';

export default Header;
