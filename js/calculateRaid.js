function calculateRAID() {
  const RAID_TYPES = {
    RAID_0: "0",
    RAID_1: "1",
    RAID_2: "2",
    RAID_3: "3",
    RAID_5: "5",
    RAID_6: "6",
    RAID_10: "10",
  };

  const raidType = document.getElementById("raidType").value;

  // Get the number of disks for each capacity
  const diskCounts = {
    1: parseInt(document.getElementById("disk1TB").innerText) || 0,
    2: parseInt(document.getElementById("disk2TB").innerText) || 0,
    4: parseInt(document.getElementById("disk4TB").innerText) || 0,
    6: parseInt(document.getElementById("disk6TB").innerText) || 0,
    8: parseInt(document.getElementById("disk8TB").innerText) || 0,
    10: parseInt(document.getElementById("disk10TB").innerText) || 0,
    12: parseInt(document.getElementById("disk12TB").innerText) || 0,
    14: parseInt(document.getElementById("disk14TB").innerText) || 0,
    16: parseInt(document.getElementById("disk16TB").innerText) || 0,
    18: parseInt(document.getElementById("disk18TB").innerText) || 0,
    20: parseInt(document.getElementById("disk20TB").innerText) || 0,
  };

  // Create an array of all disks
  const diskSizes = Object.entries(diskCounts)
    .flatMap(([size, count]) => Array(count).fill(parseInt(size)))
    .filter((size) => size > 0);
  // Only include disks that have a count

  const diskCount = diskSizes.length;
  const totalSize = diskSizes.reduce((acc, size) => acc + size, 0); // Total capacity
  let availableSize = 0;
  let systemReserved = 0;
  let dataProtection = 0;
  let unusedSpace = 0;

  if (diskCount < 1) {
    showToast("Будь ласка виберіть хоча б один диск!");
    return;
  }

  // Calculations for different RAID types
  switch (raidType) {
    case RAID_TYPES.RAID_0:
      availableSize = totalSize;
      // RAID 0 doesn't reserve space
      systemReserved = 0;
      break;
    case RAID_TYPES.RAID_1:
      if (diskCount >= 2) {
        availableSize = Math.min(...diskSizes);
        systemReserved = totalSize - availableSize;
      } else {
        showToast("RAID 1 потребує щонайменше 2 диски!");
        return;
      }
      break;
    case RAID_TYPES.RAID_2:
      if (diskCount >= 3) {
        availableSize = (diskCount - 1) * Math.min(...diskSizes);
        dataProtection = Math.min(...diskSizes);
      } else {
        showToast("RAID 2 потребує щонайменше 3 диски!");
        return;
      }
      break;
    case RAID_TYPES.RAID_3:
      if (diskCount >= 3) {
        availableSize = (diskCount - 1) * Math.min(...diskSizes);
        dataProtection = Math.min(...diskSizes);
      } else {
        showToast("RAID 3 потребує щонайменше 3 диски!");
        return;
      }
      break;
    case RAID_TYPES.RAID_5:
      if (diskCount >= 3) {
        availableSize = (diskCount - 1) * Math.min(...diskSizes);
        dataProtection = Math.min(...diskSizes);
      } else {
        showToast("RAID 5 потребує щонайменше 3 диски!");
        return;
      }
      break;
    case RAID_TYPES.RAID_6:
      if (diskCount >= 4) {
        availableSize = (diskCount - 2) * Math.min(...diskSizes);
        dataProtection = 2 * Math.min(...diskSizes);
      } else {
        showToast("RAID 6 потребує щонайменше 4 диски!");
        return;
      }
      break;
    case RAID_TYPES.RAID_10:
      if (diskCount >= 4 && diskCount % 2 === 0) {
        availableSize = totalSize / 2;
        systemReserved = totalSize / 2;
      } else {
        showToast("RAID 10 потребує парної кількості дисків (мінімум 4)!");
        return;
      }
      break;
    default:
      showToast("Вибрано невірний тип RAID!");
      return;
  }

  unusedSpace = totalSize - (availableSize + systemReserved + dataProtection);

  // Update results rounded to two decimal places
  document.getElementById("totalCapacity").textContent = totalSize.toFixed(2);
  document.getElementById("systemReserved").textContent =
    systemReserved.toFixed(2);
  document.getElementById("dataProtection").textContent =
    dataProtection.toFixed(2);
  document.getElementById("availableCapacity").textContent =
    availableSize.toFixed(2);
  document.getElementById("unusedCapacity").textContent =
    unusedSpace.toFixed(2);
}

function resetAll() {
  document.getElementById("raidType").value = 0;
  document.getElementById("disk1TB").innerText = 0;
  document.getElementById("disk2TB").innerText = 0;
  document.getElementById("disk4TB").innerText = 0;
  document.getElementById("disk6TB").innerText = 0;
  document.getElementById("disk8TB").innerText = 0;
  document.getElementById("disk10TB").innerText = 0;
  document.getElementById("disk12TB").innerText = 0;
  document.getElementById("disk14TB").innerText = 0;
  document.getElementById("disk16TB").innerText = 0;
  document.getElementById("disk18TB").innerText = 0;
  document.getElementById("disk20TB").innerText = 0;
  document.getElementById("totalCapacity").textContent = "0";
  document.getElementById("systemReserved").textContent = "0";
  document.getElementById("dataProtection").textContent = "0";
  document.getElementById("availableCapacity").textContent = "0";
  document.getElementById("unusedCapacity").textContent = "0";
}
