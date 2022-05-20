import React, { useContext, useState } from 'react';
import './_style.scss';
import TitlePage from '../../atoms/TitlePage/title-page';
import { activitiesColumns } from '../../../utils/table-definitions';

import { showErrorMessage } from '../../../utils/alertMessages';
import { useEffect } from 'react';
import ActivitiesTable from '../../molecules/ActivitiesTable/activities-table';
import ActivitiesProvider from "../../../context/ActivitiesContext";

const Activities = () => {
  return (
    <ActivitiesProvider>
      <div className="Activities">
        <TitlePage
          text="Listado de actividades"
          description="Acá podés ver un listado con las actividades de los usuarios."
        />
        <div className="ActivitiesContent">
          <h4>
            <img alt="Listado de actividades" src="img/table-list.svg" /> Listado de actividades
          </h4>
          <ActivitiesTable
            columns={activitiesColumns}
            noExpand
          />
        </div>
      </div>
    </ActivitiesProvider>
  );
};

export default Activities;
