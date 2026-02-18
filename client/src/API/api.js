export async function getPersons() {
  console.log("getPersons");  
  const res = await fetch("http://localhost:5000/person");
  return res.json();
}

export async function getPerson(id) {
  console.log("getPerson: " + id);
  const res = await fetch(`http://localhost:5000/person/${id}`);
  return res.json();
}

export async function addPerson(person){
    console.log("addPerson: " + JSON.stringify(person));
    const res = await fetch("http://localhost:5000/person", 
      { 
          method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(person) 
      });    
      return res.json();
}

export async function updatePerson(params) {
  console.log("updatePerson: " + JSON.stringify(params));
  const response = await fetch(`http://localhost:5000/person/${params._id}`, 
    { 
      method: "PUT", 
      headers: { 
        "Content-Type": "application/json" 
      }, 
        body: JSON.stringify({ 
        name: params.name, 
        lastname: params.lastname, 
        street: params.street, 
        zipcode: params.zipcode, 
        city: form.city, 
        phone: form.phone 
      }) 
    }); 
    const data = await response.json(); console.log("Updated:", data); 
    return data;};

export async function deletePerson(id) {
    console.log("deletePerson: " + id);
    const res = await fetch(`http://localhost:5000/person/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

