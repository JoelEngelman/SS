/* ============================================================
   OBJECTIVES
   ============================================================ */

const objectives=[

  [
    "Find the communications shelter",
    "Follow the broken road and investigate the old shelter."
  ],

  [
    "Recover the first transmitter component",
    "The shelter still contains a transmitter component."
  ],

  [
    "Reach the apartment district",
    "Cross the broken city and reach the eastern radio district."
  ],

  [
    "Recover the second component",
    "Find the old radio room and recover the second component."
  ],

  [
    "Find the final power core",
    "Push through the storm and recover the final power core."
  ],

  [
    "Restore the transmitter",
    "Reach the tower and activate the transmitter."
  ],

  [
    "Follow the lights",
    "Someone answered Mara's transmission."
  ],

  [
    "Speak to the settlement leader",
    "Find the people who have been following the signal."
  ],

  [
    "Find the underground transit system",
    "The scavengers disappeared into the old transit system."
  ],

  [
    "Enter the underground transit system",
    "The entrance is ahead. Press E beside the transit door."
  ],

  [
    "Find a way through the tunnels",
    "The collapse has sealed the way back. Keep moving."
  ],

  [
    "Find the trapped survivors",
    "Six people are alive somewhere deeper underground."
  ],

  [
    "Find another route out",
    "The survivors know a route through the lower tunnels."
  ],

  [
    "Escape the underground",
    "Find the old maintenance lift and get everyone back to the surface."
  ],

  [
    "Return to the settlement",
    "The six survivors are following you. Tell the leader what you found."
  ],

  [
    "Tell the leader what you discovered",
    "The underground facility may explain the Collapse."
  ],

  [
    "SURVIVAL SKIES — CONTINUED",
    "The truth beneath Sector 07 has only begun to surface."
  ]

];


function objective(){

  const o=objectives[
    Math.min(stage,objectives.length-1)
  ];

  objectiveTitle.textContent=o[0];
  objectiveText.textContent=o[1];

}
