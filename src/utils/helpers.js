export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatForSelection(data) {
  return data.reduce((acc, cur) => {
    acc.push({
      value: cur.englishName.toLowerCase(),
      label: cur.englishName,
      id: cur.id,
    });
    return acc;
  }, []);
}
