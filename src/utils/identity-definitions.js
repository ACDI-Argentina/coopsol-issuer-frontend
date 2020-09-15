const blacklist = [
    'date',
    'did',
    'dni',
    'email',
    'id',
    'lastName',
    'name',
    'phone',
    'requestState',
    'reviewDate'
  ];

const labels = {
    rejectReason: 'Razón',
    rejectionObservations: 'Observación'
}

export default fields => {
    let result = [];
    for (const prop in fields) {
      const value = fields[prop];
      if (value !== null && !blacklist.includes(prop)) {
        result.push({
          value,
          label: labels[prop]
        });
      }
    }
    return result;
  };