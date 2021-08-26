import React from 'react';
// import React, { useState } from 'react';

import { Form } from '../form/form';
import { OutputData } from '../output-data/output-data';

import { DATA } from '../../mockup';

const App: React.FC = () => {
  // const [currentPage, setCurrentPage] = useState(AppRoute.PAGE_DEFAULT);

  const MAIN_SECTION_CLASS: string = 'hero';

  return (
    <main>
      <section className={MAIN_SECTION_CLASS}>
        <Form classBlock={MAIN_SECTION_CLASS} />
        <OutputData classBlock={MAIN_SECTION_CLASS} data={DATA} />
      </section>
    </main>
  );
};

export { App };
