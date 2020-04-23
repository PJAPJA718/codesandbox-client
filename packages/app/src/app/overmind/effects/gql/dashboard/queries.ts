import {
  TeamTemplatesQuery,
  TeamTemplatesQueryVariables,
  RecentlyDeletedSandboxesQuery,
  RecentlyDeletedSandboxesQueryVariables,
  SandboxesByPathQuery,
  SandboxesByPathQueryVariables,
  OwnedTemplatesQuery,
  OwnedTemplatesQueryVariables,
  AllTeamsQuery,
  AllTeamsQueryVariables,
  ListUserTemplatesQuery,
  ListUserTemplatesQueryVariables,
  LatestSandboxesQuery,
  LatestSandboxesQueryVariables,
} from 'app/graphql/types';
import gql from 'graphql-tag';
import { Query } from 'overmind-graphql';

import {
  sandboxFragmentDashboard,
  sidebarCollectionDashboard,
  templateFragmentDashboard,
} from './fragments';

export const deletedSandboxes: Query<
  RecentlyDeletedSandboxesQuery,
  RecentlyDeletedSandboxesQueryVariables
> = gql`
  query recentlyDeletedSandboxes {
    me {
      sandboxes(
        showDeleted: true
        orderBy: { field: "updated_at", direction: DESC }
      ) {
        ...sandboxFragmentDashboard
      }
    }
  }
  ${sandboxFragmentDashboard}
`;

export const sandboxesByPath: Query<
  SandboxesByPathQuery,
  SandboxesByPathQueryVariables
> = gql`
  query SandboxesByPath($path: String!, $teamId: ID) {
    me {
      collections(teamId: $teamId) {
        ...sidebarCollectionDashboard
      }
      collection(path: $path, teamId: $teamId) {
        id
        path
        sandboxes {
          ...sandboxFragmentDashboard
        }
      }
    }
  }
  ${sandboxFragmentDashboard}
  ${sidebarCollectionDashboard}
`;

export const teamTemplates: Query<
  TeamTemplatesQuery,
  TeamTemplatesQueryVariables
> = gql`
  query TeamTemplates($id: ID!) {
    me {
      team(id: $id) {
        id
        name
        templates {
          ...templateFragmentDashboard
        }
      }
    }
  }

  ${templateFragmentDashboard}
`;

export const ownedTemplates: Query<
  OwnedTemplatesQuery,
  OwnedTemplatesQueryVariables
> = gql`
  query OwnedTemplates($showAll: Boolean) {
    me {
      templates(showAll: $showAll) {
        ...templateFragmentDashboard
      }
    }
  }

  ${templateFragmentDashboard}
`;

export const getTeams: Query<AllTeamsQuery, AllTeamsQueryVariables> = gql`
  query AllTeams {
    me {
      teams {
        id
        name
      }
    }
  }
`;

export const listPersonalTemplates: Query<
  ListUserTemplatesQuery,
  ListUserTemplatesQueryVariables
> = gql`
  query ListUserTemplates {
    me {
      templates {
        ...templateFragmentDashboard
      }

      recentlyUsedTemplates {
        ...templateFragmentDashboard

        sandbox {
          git {
            id
            username
            commitSha
            path
            repo
            branch
          }
        }
      }

      bookmarkedTemplates {
        ...templateFragmentDashboard
      }

      teams {
        id
        name
        bookmarkedTemplates {
          ...templateFragmentDashboard
        }
        templates {
          ...templateFragmentDashboard
        }
      }
    }
  }

  ${templateFragmentDashboard}
`;

export const recentSandboxes: Query<
  LatestSandboxesQuery,
  LatestSandboxesQueryVariables
> = gql`
  query LatestSandboxes(
    $limit: Int!
    $orderField: String!
    $orderDirection: Direction!
  ) {
    me {
      sandboxes(
        limit: $limit
        orderBy: { field: $orderField, direction: $orderDirection }
      ) {
        ...sandboxFragmentDashboard
      }
    }
  }
  ${sandboxFragmentDashboard}
`;
