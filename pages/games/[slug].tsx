import React from "react";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";
import { Game } from "../../components/types/Games";
import Link from "next/link";

const GameBySlugPage: React.FC<{ games: Game[]; urlSlug: string }> = ({
  games,
  urlSlug,
}) => {
  return (
    <div>
      <h1>GAME BY SLUG PAGE</h1>
      <div>
        <ul>
          {games.map((game) => {
            if (game.slug === urlSlug) {
              return (
                <div>
                  <li key={game.id}>
                    <Link href={game.slug}>{game.name}</Link>
                    <p>Buy it for only : {game.price / 100}$</p>
                  </li>
                  <img key={game.cover} src={game?.cover?.url} alt="" />
                  <p>{game.summary}</p>
                  <div key={game.screenshots}>
                    {game.screenshots.map((screens) => {
                      return <img src={screens} alt="" />;
                    })}
                  </div>
                </div>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default GameBySlugPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();

  const games = await mongodb.db().collection("games").find().toArray();

  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
      urlSlug: context.params.slug,
    },
  };
};
