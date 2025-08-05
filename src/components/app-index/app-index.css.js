/*
 * Copyright 2024 Bilbao Vizcaya Argentaria, S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { css } from 'lit';

export default css`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
  }

  main {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  main ::slotted(*) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: hidden;
  }

  main ::slotted([state="active"]) {
    visibility: visible;
  }

  header {
    width: 100%;
    background-color: var(--surface);
    color: var(--primary);
    padding: 0px 1rem;
    box-sizing: border-box;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 1rem 0px;
  }
 
  .header-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h1 {
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: 300;
    color: var(--primary);
  }

  a {
    text-decoration: none;
    color: var(--primary);
  }

  /* 1024px */
  @media (min-width: 64rem) {
    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 58rem;
      height: 8rem;
      margin: 0 auto;
      will-change: height;
      transition: height 0.1s ease-in-out;
    }
  }

  /* 1440px */
  @media (min-width: 90rem) {
    header {
      max-width: 71.5rem;
    }
  }
`;