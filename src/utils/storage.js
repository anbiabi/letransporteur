const DRIVERS_KEY = 'drivers';

export const getDrivers = () => {
  const drivers = localStorage.getItem(DRIVERS_KEY);
  return drivers ? JSON.parse(drivers) : [];
};

export const addDriver = (driver) => {
  const drivers = getDrivers();
  const newDriver = {
    ...driver,
    id: Date.now()
  };
  drivers.push(newDriver);
  localStorage.setItem(DRIVERS_KEY, JSON.stringify(drivers));
  return newDriver;
};
