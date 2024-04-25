drop table if exists othello_games;
create table othello_games (
  id serial not null
  , status text not null
  , created_at timestamp not null
  , primary key (id)
);

drop table if exists othello_turns;
create table othello_turns (
  game_id int not null
  , turn_count int not null check (turn_count >= 0 AND turn_count <= 60)
  , end_at timestamp not null
  , primary key (game_id, turn_count)
);

drop table if exists othello_moves;
create table othello_moves (
  game_id int not null
  , turn_count int not null
  , now_turn int not null
  , x int not null
  , y int not null
  , primary key (game_id, turn_count, now_turn)
);

drop table if exists othello_boards;
create table othello_boards (
  game_id int not null
  , turn_count int not null
  , board_configuration text not null
  , primary key (game_id, turn_count)
);