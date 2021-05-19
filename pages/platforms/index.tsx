import React from "react";
import { GetServerSideProps } from "next";
import { getDatabase } from "../../src/database";
import { Platform } from "../../components/types/Games";
import Link from "next/link";

const PlatformsMainPage: React.FC<{ platforms: Platform[] }> = ({
  platforms,
}) => {
  return (
    <div>
      <div>
        <ul>
          {platforms.map((platform, index) => {
            return (
              <div>
                <li key={platform.id}>
                  <Link href={`/platforms/${platform.slug}`}>
                    {platform.name}
                  </Link>
                </li>
                <img src={platform.cover} alt="" />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PlatformsMainPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const platforms = await mongodb
    .db()
    .collection("games")
    .find({})
    .toArray()
    .then((games) => {
      const platforms: Platform[] = [];

      games.forEach((game) => {
        const platform = platforms.find(
          (platform) => platform.slug === game.platform.slug
        );
        if (!platform) {
          platforms.push(game.platform);
        }
      });

      return platforms.map((platform) => ({
        name: platform.name,
        slug: platform.slug,
        cover: platform.platform_logo_url,
      }));
    });

  return {
    props: {
      platforms: JSON.parse(JSON.stringify(platforms)),
    },
  };
};
