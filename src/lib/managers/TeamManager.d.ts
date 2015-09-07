declare module artemis.managers {
    import ImmutableBag = artemis.utils.ImmutableBag;
    import Manager = artemis.Manager;
    /**
    * Use this class together with PlayerManager.
    *
    * You may sometimes want to create teams in your game, so that
    * some players are team mates.
    *
    * A player can only belong to a single team.
    *
    * @author Arni Arent
    *
    */
    class TeamManager extends Manager {
        private playersByTeam_;
        private teamByPlayer_;
        constructor();
        initialize(): void;
        getTeam(player: string): string;
        setTeam(player: string, team: string): void;
        getPlayers(team: string): ImmutableBag<String>;
        removeFromTeam(player: string): void;
    }
}
