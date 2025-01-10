const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      listContacts: [], // Lista de contactos
    },
    actions: {
      getInfoContacts: () => {
        fetch("https://playground.4geeks.com/contact/agendas/diego/contacts")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(
                "Error fetching contacts: " + response.statusText,
              );
            }
          })
          .then((data) => {
            setStore({ listContacts: data.contacts || [] }); // Actualizamos el estado
            console.log("Contacts fetched successfully:", data.contacts);
          })
          .catch((error) => {
            console.log("Error fetching contacts:", error);
          });
      },

      // Eliminar un contacto
      deleteContact: (id) => {
        fetch(
          `https://playground.4geeks.com/contact/agendas/diego/contacts/${id}`,
          {
            method: "DELETE",
          },
        )
          .then((response) => {
            if (response.ok) {
              const store = getStore();
              const updatedContacts = store.listContacts.filter(
                (contact) => contact.id !== id,
              );
              setStore({ listContacts: updatedContacts }); // Actualizamos el estado eliminando el contacto
              console.log(`Contact with ID ${id} deleted successfully.`);
            } else {
              throw new Error(
                `Error deleting contact with ID ${id}: ` + response.statusText,
              );
            }
          })
          .catch((error) => {
            console.log("Error deleting contact:", error);
          });
      },

      createContact: (payload) => {
        fetch("https://playground.4geeks.com/contact/agendas/diego/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
            address: payload.address,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error creating contact: " + response.statusText);
            }
          })
          .then((data) => {
            const store = getStore();
            setStore({ listContacts: [...store.listContacts, data] }); // Añadir el nuevo contacto al estado
            console.log("Contact created successfully:", data);
          })
          .catch((error) => {
            console.log("Error creating contact:", error);
          });
      },

      editContact: (id, updatedContact) => {
        fetch(
          `https://playground.4geeks.com/contact/agendas/diego/contacts/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContact),
          },
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(
                `Error updating contact with ID ${id}: ` + response.statusText,
              );
            }
          })
          .then((data) => {
            const store = getStore();
            const updatedList = store.listContacts.map((item) =>
              item.id === id ? { ...item, ...data } : item,
            );
            setStore({ listContacts: updatedList }); // Actualizar el estado con el contacto editado
            console.log("Contact updated successfully:", data);
          })
          .catch((error) => {
            console.log("Error updating contact:", error);
          });
      },
    },
  };
};

export default getState;
