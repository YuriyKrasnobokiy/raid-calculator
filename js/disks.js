const disks = [
  { size: 1, label: "1 ТБ" },
  { size: 2, label: "2 ТБ" },
  { size: 4, label: "4 ТБ" },
  { size: 6, label: "6 ТБ" },
  { size: 8, label: "8 ТБ" },
  { size: 10, label: "10 ТБ" },
  { size: 12, label: "12 ТБ" },
  { size: 14, label: "14 ТБ" },
  { size: 16, label: "16 ТБ" },
  { size: 18, label: "18 ТБ" },
  { size: 20, label: "20 ТБ" },
];

const diskList = document.getElementById("diskList");

const diskElements = disks.map((disk) => {
  const diskTypeWrap = document.createElement("div");
  diskTypeWrap.className = "disk-type-wrap form-group";

  const label = document.createElement("label");
  label.textContent = disk.label;

  const diskQuantity = document.createElement("div");
  diskQuantity.className = "disk-quantity input-group";

  const decrementButton = document.createElement("button");
  decrementButton.className = "btn btn-secondary";
  decrementButton.textContent = "-";
  decrementButton.onclick = () => updateDiskCount(`disk${disk.size}TB`, false);

  const countSpan = document.createElement("span");
  countSpan.id = `disk${disk.size}TB`;
  countSpan.className = "form-control text-center";
  countSpan.textContent = "0";

  const incrementButton = document.createElement("button");
  incrementButton.className = "btn btn-secondary";
  incrementButton.textContent = "+";
  incrementButton.onclick = () => updateDiskCount(`disk${disk.size}TB`, true);

  diskQuantity.appendChild(decrementButton);
  diskQuantity.appendChild(countSpan);
  diskQuantity.appendChild(incrementButton);

  diskTypeWrap.appendChild(label);
  diskTypeWrap.appendChild(diskQuantity);

  return diskTypeWrap;
});

// Add all elements into container

diskElements.forEach((element) => {
  diskList.appendChild(element);
});

function updateDiskCount(diskId, increment) {
  const countSpan = document.getElementById(diskId);
  let currentCount = parseInt(countSpan.textContent);
  currentCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1);
  countSpan.textContent = currentCount;
}
