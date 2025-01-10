import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Importar el contexto

const CardContact = () => {
  const { store, actions } = useContext(Context); // Usar el contexto
  const [isFormVisible, setIsFormVisible] = useState(false); // Estado para mostrar/ocultar el formulario
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  }); // Estado para almacenar la información del nuevo contacto

  // Obtener los contactos cuando el componente se carga
  useEffect(() => {
    actions.getInfoContacts(); // Obtener la lista de contactos
  }, [actions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificamos que todos los campos estén llenos
    if (
      newContact.name &&
      newContact.email &&
      newContact.phone &&
      newContact.address
    ) {
      actions.createContact(newContact); // Llamar a la acción de crear contacto
      setNewContact({ name: "", email: "", phone: "", address: "" }); // Limpiar el formulario
      setIsFormVisible(false); // Ocultar el formulario
    } else {
      alert("Por favor, rellene todos los campos.");
    }
  };

  return (
    <div>
      <h2>Lista de Contactos</h2>

      {/* Botón para mostrar el formulario */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Cancelar" : "Añadir Contacto"}
      </button>

      {/* Formulario para añadir un nuevo contacto */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newContact.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={newContact.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Teléfono
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={newContact.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={newContact.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Añadir Contacto
          </button>
        </form>
      )}

      {/* Mostrar la lista de contactos */}
      <ul className="list-group">
        {store.listContacts.length > 0 ? (
          store.listContacts.map((contact) => (
            <li key={contact.id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <div>
                  <h5>{contact.name}</h5>
                  <p>{contact.email}</p>
                </div>
                <div>
                  <button
                    onClick={() => actions.deleteContact(contact.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                  <Link
                    to={`/editContact/${contact.id}`}
                    className="btn btn-warning"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No hay contactos disponibles</p>
        )}
      </ul>
    </div>
  );
};

export default CardContact;
