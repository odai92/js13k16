
// Globals
  
// Canvas context 2D
var c = a.getContext("2d");

// Init local storage to 1 if it's not already set
localStorage["scpm"] = 20;

// Current screen (0: main menu / 1: level selection / 2: playing / 3: editor)
var screen = 1;

// Previous screen (when we quit a level, 0: when playing a shared level / 1: when playing a built-in level / 3: whe testing a level in the level eitor)
var last_screen = 0;

// Mouse down (player is clicking)
var mousedown = false;

// Player is right clicking
var rightclick = false;

// Hero's width (not 32px in order to pass easily between two blocks)
var hero_width = 24;

// Gravity (downwards acceleration):
var gravity = 2;

// Max fall speed (for hero and cubes)
var max_fall_speed = 24;

// Jump speed (upwards vy force):
var jump_speed = 20;

// Walk speed (horizontal vx)
var walk_speed = 6;

// Mouse coords (in tiles)
var tile_x = tile_y = 0;

// Mouse coords (in px)
var x = y = 0;

// Current level
var level = 0;

// All the data of the current level
var level_data = {};

// Other globals (editor)
var pipe_click, current_pipe, balance_click, current_balance, current_editor_tile, mouse_tile_x, mouse_tile_y, pipe_high, pipe_low, end_pipe, end_pole, number, drawn_tile;

// Other globals (gameplay)
var win, win_frame, coins_left, loop, frame, current_hero, solid, yellow_toggle, yellow_toggle_last_frame, pipes_state, balances_state, yellow_toggle_delay, yellow_toggle_on, blue_portal, orange_portal, temp_side, heros, hero, target, current_cube, portals, current_portal;

// Built-in levels:
var levels = [
  
{},
  
{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000200\
0000060606000000000000000060000000000000\
0000000000000000400400000000000000000000\
0F00000000000004400440000000000000000000\
0G00000000000044400444000070000700000400\
3333333333333333300333333333333333333333\
3333333333333333300333333333333333333333\
0000000000000000000000000000000000000000","pipes":[[]],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000060060060000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000060060000000000000000000020\
0000000050050050050000400040000000000000\
0F00000000000000000004400044000000000000\
0G00000000000000000044400044400077000000\
3333333333333333333333333333333333333333\
3333333333333333333333333333333333333333\
0000000000000000000000000000000000000000","pipes":[],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000060000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000040040040080080000020\
0000060060060000400000000000000000000000\
0F00000000000004440000000000000000000000\
0G00000000000044444000000000000000000000\
3338888888888888888888888888888888888333\
3338888888888888888888888888888888888333\
0000000000000000000000000000000000000000","pipes":[],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000020\
0000000000000000000000060000000000000000\
0000000000006000000000000000000000000000\
0000000000000000000000060000000000000000\
00000000000060000000000000000000<0000000\
0000000000000000000000060000000000000000\
0000000000006000000000000000000000000000\
00000000000000000000000000000000<0000044\
00000<00<0000000000000040000000000000044\
0000000000004000000000044000000000000044\
00F00000000044000<00<0044400000000000044\
00G0000000004440000000044440000000000044\
3333333333333333303303333333333333333333\
3333333333333333333333333333333333333333\
0000000000000000000000000000000000000000","pipes":[],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0000000<00000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000099999000000000000000000000000000000\
0000000009000000000000000000000000000000\
00000::::9000000000000000000000000000000\
0000000009000000000000000000000000000000\
0000099999000000000000000000000000000000\
0000000009000000000000000000000000000000\
00000::::9000000000000000000000000000020\
000000000900000000<000000000000000000000\
0000099999000000005000000000000000000000\
0000000009000000000000000000000000000040\
0F00000009000000000000000000000000000040\
0G000;00090000;0000000;00000000000;00040\
3333333333333333333999999933333:::::::33\
3333333333333333333000000000000000000033\
0000000000000000000000000000000000000000","pipes":[],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000033333333333300\
0000000044000000000000000000000000000000\
0000000000000000000060000000000000000000\
000000000000600000000000000<000000200000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000300000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0F00000000000000000000000000000000000000\
0G00000000000000000000000000000000000000\
3333333333333333333333333333333333333333\
3333333333333333333333333333333333333333\
0000000000000000000000000000000000000000","pipes":[[8,8,16,6,16],[24,16,6,22,16],[36,7,16,30,5]],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000<00000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000009990000000000\
0000000000000000000000000000000000000020\
0000000000000000000000000000000000000000\
00F0000000000000000000000000000000000000\
00G0000000000000000000000000000000000000\
3333330000000000000000000000000000000040\
3333330000000000000000000000000000000040\
0000000000000000000000000000000000000040\
000000000000000000;000060000000033333333\
0000000000000000333330060000000033333333\
0000000000000000333330060000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000","pipes":[],"balances":[[8,9,13,17],[28,6,23,14]]},

{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0444444444444400000000000000000000000000\
0300000000000000000000000000000000000040\
0306060606000000000000000000000000006040\
03000000000<0000000000000000000000000040\
0300000000000000000000000000000000000040\
0300000444444400000000000000000000000040\
0300000300000000000000000000000000000040\
0300000300000000000000000000000000000040\
0300000300000000000000000000000000000040\
0300000300000000000000000000000000000040\
0300000300000000000000000020000000000040\
0300000300000000000000000000000000000040\
0400F00400000000000000000000000000000040\
0400G0040000000000000000000000000000;040\
044444440000000000000000003::::::::33330\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000","pipes":[],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0444400000000000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000006000000000000000000000000000\
0400000000000000000000000000000000000000\
0400000000000000000000000000000000000200\
0400000000000000000000000000000000000000\
040000F000000000000000000000000000000000\
040000G000000000000000000000000000000000\
0444444444444000000000000888888888888880\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000","pipes":[],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000008888888888888888888800000000000\
0000000003000000000000000000800000000000\
0000000003000000000000000000800000000000\
0000000003002000000000000000800000000000\
0000000003000000000000000000800000000000\
0000000003000000000006000000800000000000\
0000000003000007770000000000800000000000\
0000000004444444444444060000800000000000\
0000000003000000000000000000800000000000\
0000000003000000000006000000800000000000\
0000000003000000000000000000800000000000\
0000000003000000000000000000800000000000\
000000000300F000000000000000800000000000\
000000000300G000000000000000800000000000\
0000000004444444444444000000800000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000","pipes":[],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000F00000000000000000000000000000000000\
0000G00000000000000000000000000000000000\
0000400000004040000000000000000000000000\
0000400000004040000000000000000000000000\
0000400000<00040000000000000000000000000\
0000400000000040000000000000000000000000\
0000400000000<40000000000000000000000000\
0000400000000040000000000000000000000000\
0000444444444440000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000","pipes":[],"balances":[]},

{"hash":"0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000000000000000000000000000000\
000000000F000000020000000000000000000000\
000000000G00000;000000000000000000000000\
0000000005559999990000000000000000000000\
0000000005559999990000000000000000000000\
0000000000000009000000000000000000000000\
0000000000000009000000000000000000000000\
0000000000000009000000000000000000000000\
0000000000000009000000000000000000000000\
0000000000000009000000000000000000000000\
0000000000000000000000000000000000000000\
0000000000000009000000000000000000000000\
0000000000000009000000000000000000000000\
0000000000000009000000000000000000000000\
0000000000000009000000000000000000000000","pipes":[],"balances":[]}

];
