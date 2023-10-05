/* Your Code Here */
let employee = (["Gray", "Worm", "Security", 1])
function createEmployeeRecord(employee){
    let testEmployee = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
      };
    return testEmployee;
}

const createEmployeeRecords = function (employeeData) {
    return employeeData.map(function (employee) {
        return createEmployeeRecord(employee);
    }); 
};

let createTimeInEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    });

    return this;
};


let createTimeOutEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    });

    return this;
};

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(e => e.date === date);
    const timeOut = this.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

//finds an employee with their first name
function findEmployeeByFirstName(collection, firstName) {
    return collection.find(employee => employee.firstName === firstName);
  }
  
  //calculates employee's payroll
  //correctly sums the payroll burden when passed an array of employee records
  function calculatePayroll(employees) {
    return employees.reduce(function (totalPay, employee) {
      return totalPay + allWagesFor.call(employee);
    }, 0);
  }