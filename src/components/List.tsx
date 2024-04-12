import axios from "axios";
import { useEffect, useState } from "react";

export const List = () => {
  interface ExaminerChecklist {
    id?: number;
    finalJson?: string;
    include: boolean;
    signed: boolean;
    notarized: boolean;
    createdBy: string;
    createdDate: Date;
    modifiedBy: string;
    modifiedDate: Date;
  }
  useEffect(() => {
    getCheckListDetails();
  }, []);
  const [checklists, setchecklists] = useState<ExaminerChecklist[]>();
  const API_URL = "https://api-auditreporttool-dev.azurewebsites.us/";
  const getCheckListDetails = async () => {
    try {
      const config = {
        headers: { "Access-Control-Allow-Origin": "*" },
      };
      const res = await axios.get(API_URL + "api/ExaminerChecklists", config);
      setchecklists(res.data);
      console.log(res.data);
    } catch (e) {
      throw e;
    }
  };
  return (
    <div>
      <table
        border={2}
        className="table table-striped"
        aria-labelledby="tabelLabel"
      >
        <thead>
          <tr>
            <th>Include</th>
            <th>Created By</th>
            <th>finalJson</th>
            <th>notarized</th>
          </tr>
        </thead>
        <tbody>
          {checklists?.map((checklist) => (
            <tr>
              <td>{checklist.include}</td>
              <td>{checklist.createdBy}</td>
              <td>{checklist.finalJson}</td>
              <td>{checklist.notarized}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* { checklists?.map( checklist => <p>{ checklist.createdBy }</p>) } */}
    </div>
  );
};

export default List;
