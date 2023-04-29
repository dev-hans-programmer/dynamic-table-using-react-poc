import React, { useState, useEffect } from 'react';

export default function App() {
  const headerStatic = { title: '', id: '' };
  const [header, setHeader] = useState(headerStatic);

  const [headers, setHeaders] = useState([
    { title: 'username', id: '12' },
    {
      title: 'password',
      id: '21',
    },
  ]);

  const [isAddingHead, setIsAddingHead] = useState(false);
  const [isRowAdding, setIsRowAdding] = useState(false);

  const [rows, setRows] = useState([
    {
      username: 'Hasan',
      password: 1223,
    },
  ]);

  function getNewRowObject() {
    const obj = {};

    for (const head of headers) {
      obj[head.title] = '';
    }
    return obj;
  }

  const [newRow, setNewRow] = useState(getNewRowObject());

  function handleAddHeader() {
    setIsAddingHead((prev) => !prev);
  }

  function onChangeNewRow(e) {
    const { name, value } = e.target;

    setNewRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  console.log('NEW ROW', newRow);

  useEffect(() => {
    setNewRow(getNewRowObject());
  }, [headers]);

  function onChangeHeader(e) {
    console.log('e', e.target);
    setHeader((prev) => ({
      ...prev,
      title: e.target.value,
      id: e.target.value,
    }));
  }

  function handleAddValue() {
    setIsRowAdding((prev) => !prev);
  }

  function handleHeaderDone() {
    setHeaders((prev) => [...prev, header]);
    setIsAddingHead(false);
    setHeader(headerStatic);
  }

  function onSaveRow() {
    setRows((prev) => [...prev, newRow]);
    setIsRowAdding(false);
    setNewRow(getNewRowObject());
  }

  return (
    <main>
      <div className="button-container">
        <button onClick={handleAddHeader}>Add head</button>
        <button onClick={handleAddValue}>Add value</button>

        {isAddingHead && (
          <>
            <input
              placeholder="Add header"
              value={header.title}
              onChange={onChangeHeader}
            />
            <button onClick={handleHeaderDone}>Done </button>
          </>
        )}
      </div>
      <table>
        <thead>
          {/* render headers */}
          {headers.map((header) => (
            <th>{header.title}</th>
          ))}
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr>
              {headers.map((header) => (
                <td>{row[header.title]} </td>
              ))}
            </tr>
          ))}
          {isRowAdding && (
            // Dynamically create the inputs for every header
            <tr>
              {headers.map((header) => (
                <td>
                  <input
                    placeholder="Enter value"
                    name={header.title}
                    value={newRow[header.title]}
                    onChange={onChangeNewRow}
                  />
                </td>
              ))}

              <td>
                <button onClick={onSaveRow}>ok</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
