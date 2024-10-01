# RAID Calculator

This project is a simple RAID calculator that allows users to select different disk sizes and quantities for various RAID levels. It calculates the total capacity, system-reserved space, data protection, available capacity, and unused space based on the RAID type and selected disks.

## Features

### RAID Types

Supports multiple RAID levels:

- RAID 0
- RAID 1
- RAID 2
- RAID 3
- RAID 5
- RAID 6
- RAID 10

### Dynamic Disk Selection

Users can select the number of disks for each capacity (1TB, 2TB, 4TB, etc.) and the application will calculate the total disk size.

### Disk Size Options

Users can choose disk capacities from 1TB to 20TB for each disk slot.

### Real-time Calculation

The calculator computes the total disk capacity and RAID-specific information as soon as the user inputs their disk selections and RAID type.

## How to Use

### Select RAID Type

Choose the RAID level from the dropdown menu.

### Select Disk Quantities

For each available disk size (1TB, 2TB, 4TB, etc.), select how many of those disks you wish to include in the RAID array using the dropdown menus.

### Click "Calculate"

Once you've selected the RAID type and disks, click the "Calculate" button to calculate the results.

### View Results

#### The calculator will display the following:

- Total Disk Capacity (all disks combined)
- System Reserved (space reserved for RAID configuration)
- Data Protection (space used for redundancy)
- Available Capacity (usable storage space)
- Unused Capacity (leftover space)

## Calculations

- RAID 0: No redundancy, full capacity of all disks is used.
- RAID 1: Mirroring; only the capacity of the smallest disk is available, the rest is reserved for redundancy.
- RAID 2/3/5: Parity-based RAID, requiring a minimum of 3 disks. Available capacity is (N-1) times the smallest disk size.
- RAID 6: Double parity, requiring at least 4 disks. Available capacity is (N-2) times the smallest disk size.
- RAID 10: Mirrored and striped; requires an even number of disks. Available capacity is half the total disk capacity.

## Technologies Used

- HTML: For the structure of the calculator.
- CSS: Basic styling for buttons and layout.
- JavaScript: The logic for RAID calculation and dynamic result display.
