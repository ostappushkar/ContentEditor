const toggleModal = (modalOpen: boolean) => {
  return {
    type: "toggleModal",
    payload: { modalOpen: modalOpen }
  };
};
const getUser = (isLogged: boolean, currentUser: any, apps: any) => {
  return {
    type: "getUser",
    payload: { isLogged: isLogged, currentUser: currentUser, apps: apps }
  };
};
const setEditing = (isEditing: boolean, appItem: any) => {
  return {
    type: "setEditing",
    payload: { isEditing: isEditing, appItem: appItem }
  };
};
const setValues = (values: any, initial: any) => {
  return {
    type: "setValues",
    payload: { values: values, initial: initial }
  };
};
export { toggleModal, getUser, setEditing, setValues };
