import React, { useState } from 'react';

import { Form } from '../form/form';
import { OutputData } from '../output-data/output-data';

const App: React.FC = () => {
  const [data, setData] = useState([]);
  const isData: boolean = data.length > 0;

  const MAIN_SECTION_CLASS: string = 'hero';

  return (
    <main>
      <section className={MAIN_SECTION_CLASS}>
        <Form classBlock={MAIN_SECTION_CLASS} setData={setData} />
        {isData && <OutputData classBlock={MAIN_SECTION_CLASS} data={data} />}
      </section>
    </main>
  );
};

export { App };
