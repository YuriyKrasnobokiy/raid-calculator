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
    showToast("Please select at least one disk!");
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
        showToast("RAID 1 requires at least 2 disks.");
        return;
      }
      break;
    case RAID_TYPES.RAID_2:
      if (diskCount >= 3) {
        availableSize = (diskCount - 1) * Math.min(...diskSizes);
        dataProtection = Math.min(...diskSizes);
      } else {
        showToast("RAID 2 requires at least 3 disks.");
        return;
      }
      break;
    case RAID_TYPES.RAID_3:
      if (diskCount >= 3) {
        availableSize = (diskCount - 1) * Math.min(...diskSizes);
        dataProtection = Math.min(...diskSizes);
      } else {
        showToast("RAID 3 requires at least 3 disks.");
        return;
      }
      break;
    case RAID_TYPES.RAID_5:
      if (diskCount >= 3) {
        availableSize = (diskCount - 1) * Math.min(...diskSizes);
        dataProtection = Math.min(...diskSizes);
      } else {
        showToast("RAID 5 requires at least 3 disks.");
        return;
      }
      break;
    case RAID_TYPES.RAID_6:
      if (diskCount >= 4) {
        availableSize = (diskCount - 2) * Math.min(...diskSizes);
        dataProtection = 2 * Math.min(...diskSizes);
      } else {
        showToast("RAID 6 requires at least 4 disks.");
        return;
      }
      break;
    case RAID_TYPES.RAID_10:
      if (diskCount >= 4 && diskCount % 2 === 0) {
        availableSize = totalSize / 2;
        systemReserved = totalSize / 2;
      } else {
        showToast("RAID 10 requires an even number of disks (minimum 4).");
        return;
      }
      break;
    default:
      showToast("Invalid RAID type selected.");
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

function updateDiskCount(diskId, increment) {
  const diskCountDisplay = document.getElementById(diskId);
  let currentValue = parseInt(diskCountDisplay.innerText);
  currentValue = increment ? currentValue + 1 : Math.max(0, currentValue - 1);
  diskCountDisplay.innerText = currentValue;
}

function showToast(message) {
  const toastBody = document.querySelector(".toast-body");
  toastBody.textContent = message;

  const toastEl = document.getElementById("toast");
  const toast = new bootstrap.Toast(toastEl, {
    autohide: true,
    delay: 5000,
  });
  toast.show();
}
