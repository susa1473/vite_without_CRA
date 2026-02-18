import { useState, useEffect } from "react";
import { getPersons, addPerson, deletePerson } from "./API/api";

function App() {
  const [persons, setPersons] = useState([]);

  const [person, setPerson] = useState({
    _id: "",
    name: "",
    lastname: "",
    street: "",
    zipcode: "",
    city: "",
    phone: "",
  });

  useEffect(() => {
    getPersons().then(setPersons);
  }, []);

  // -------------------------
  // LÄGG TILL PERSON (POST)
  // -------------------------
  const handleAdd = async () => {
    const savedPerson = await addPerson({
      name: person.name,
      lastname: person.lastname,
      street: person.street,
      zipcode: person.zipcode,
      city: person.city,
      phone: person.phone,
    });

    setPersons([...persons, savedPerson]);

    setPerson({
      _id: "",
      name: "",
      lastname: "",
      street: "",
      zipcode: "",
      city: "",
      phone: "",
    });
  };

  // -------------------------
  // EDIT – FYLL FORMULÄRET
  // -------------------------
  const handleEdit = (p) => {
    setPerson(p); // p innehåller _id
  };

  // -------------------------
  // SPARA ÄNDRINGAR (PUT)
  // -------------------------
  const updatePerson = async () => {
    const response = await fetch(`http://localhost:5000/person/${person._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: person.name,
        lastname: person.lastname,
        street: person.street,
        zipcode: person.zipcode,
        city: person.city,
        phone: person.phone,
      }),
    });

    const updated = await response.json();

    // Uppdatera listan
    setPersons((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );

    // Töm formuläret
    setPerson({
      _id: "",
      name: "",
      lastname: "",
      street: "",
      zipcode: "",
      city: "",
      phone: "",
    });
  };

  // -------------------------
  // DELETE
  // -------------------------
  const handleDelete = async (id) => {
    await deletePerson(id);
    setPersons((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div>
      <h2>Personformulär</h2>

      <input
        value={person.name}
        placeholder="Namn"
        onChange={(e) => setPerson({ ...person, name: e.target.value })}
      />
      <br />

      <input
        value={person.lastname}
        placeholder="Efternamn"
        onChange={(e) => setPerson({ ...person, lastname: e.target.value })}
      />
      <br />

      <input
        value={person.street}
        placeholder="Gatuadress"
        onChange={(e) => setPerson({ ...person, street: e.target.value })}
      />
      <br />

      <input
        value={person.zipcode}
        placeholder="Postnummer"
        onChange={(e) => setPerson({ ...person, zipcode: e.target.value })}
      />
      <br />

      <input
        value={person.city}
        placeholder="Stad"
        onChange={(e) => setPerson({ ...person, city: e.target.value })}
      />
      <br />

      <input
        value={person.phone}
        placeholder="Telefon"
        onChange={(e) => setPerson({ ...person, phone: e.target.value })}
      />
      <br />

      {/* Visa rätt knapp beroende på om vi är i edit-läge */}
      {person._id ? (
        <button onClick={updatePerson}>Spara ändringar</button>
      ) : (
        <button onClick={handleAdd}>Lägg till person</button>
      )}

      <h1>Personer</h1>
      <ul>
        {persons.map((i) => (
          <li key={i._id}>
            {i.name} {i.lastname}, {i.street}, {i.zipcode} {i.city}, {i.phone}
            <button onClick={() => handleDelete(i._id)}>Ta bort</button>
            <button onClick={() => handleEdit(i)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
