export const applyFilters = (list, filters) => {
  return list?.filter(item => {
    for (let [key, filter] of Object.entries(filters)) { //Tener en cuenta aca los tipos de datos, sobre todo si se trata de fechas
      const itemValue = item?.[`${key}`];
  
      if (typeof itemValue === "string") {
        return itemValue.toUpperCase().includes(filter.toUpperCase());
      }
    }
  
    return true;
  });
}
