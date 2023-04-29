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
  const [isRowEditing, setIsRowEditing] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  const [rows, setRows] = useState([
    {
      username: 'Hasan',
      password: 1223,
      id: Math.trunc(Math.random() * 1000),
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
      id: Math.trunc(Math.random() * 1000),
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

  function handleEdit(row) {
    console.log('row', row);
    setEditingRow(row);
    setIsRowEditing(true);
  }

  function onSaveRow() {
    setRows((prev) => [...prev, newRow]);
    setIsRowAdding(false);
    setNewRow(getNewRowObject());
  }

  function onEditChange(e) {
    const { name, value } = e.target;
    setEditingRow((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  console.log('EDITING ROW', editingRow);

  function onUpdate() {
    // update the existing row based on the editied value
    setRows((prev) =>
      prev.map((item) =>
        item.id === editingRow.id ? { ...item, ...editingRow } : item
      )
    );

    setIsRowEditing(false);
    // turn off editing flag
  }

  return (
    <main>
      <div className="button-container">
        <button onClick={handleAddHeader}>Add head</button>
        <button onClick={handleAddValue} disabled={isRowAdding}>Add value</button>

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
              {headers.map((header) =>
                //
                isRowEditing && row.id === editingRow.id ? (
                  <>
                    <td>
                      <input
                        value={editingRow[header.title]}
                        name={header.title}
                        onChange={onEditChange}
                      />
                    </td>
                  </>
                ) : (
                  <td>{row[header.title]} </td>
                )
              )}

              <td>
                <button
                  onClick={isRowEditing && row.id === editingRow.id ? onUpdate : () => handleEdit(row)}
                >
                  {isRowEditing && row.id === editingRow.id? 'Update' : 'Edit'}{' '}
                </button>{' '}
              </td>
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
