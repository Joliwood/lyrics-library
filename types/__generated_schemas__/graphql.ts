import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Album = {
  __typename?: 'Album';
  artist?: Maybe<Artist>;
  artist_id?: Maybe<Scalars['Int']['output']>;
  cover?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  release_year?: Maybe<Scalars['Int']['output']>;
  songOnAlbum?: Maybe<Array<Maybe<SongOnAlbum>>>;
  songs?: Maybe<Array<Maybe<Song>>>;
  title: Scalars['String']['output'];
};

export type AlbumCreateInput = {
  cover?: InputMaybe<Scalars['String']['input']>;
  release_year?: InputMaybe<Scalars['Int']['input']>;
  songIds: Array<Scalars['Int']['input']>;
  songOnAlbum: Array<SongOnAlbumInput>;
  title: Scalars['String']['input'];
};

export type AlbumFilterInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  release_year?: InputMaybe<ReleaseYear>;
};

export type AlbumUpdateInput = {
  cover?: InputMaybe<Scalars['String']['input']>;
  release_year?: InputMaybe<Scalars['Int']['input']>;
  songIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Artist = {
  __typename?: 'Artist';
  albums?: Maybe<Array<Maybe<Album>>>;
  country?: Maybe<Scalars['String']['output']>;
  favorites?: Maybe<Array<Maybe<ArtistLikeSong>>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  songs?: Maybe<Array<Maybe<Song>>>;
};

export type ArtistCreateInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type ArtistFilterInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ArtistLikeSong = {
  __typename?: 'ArtistLikeSong';
  artist_id: Scalars['Int']['output'];
  song_id: Scalars['Int']['output'];
};

export type ArtistUpdateInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
};

export type ArtistUser = {
  __typename?: 'ArtistUser';
  albums?: Maybe<Array<Maybe<Album>>>;
  country?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
};

export enum DurationRange {
  MoreThanFiveMinutes = 'MORE_THAN_FIVE_MINUTES',
  OneMinute = 'ONE_MINUTE',
  OneToThreeMinutes = 'ONE_TO_THREE_MINUTES',
  ThreeToFiveMinutes = 'THREE_TO_FIVE_MINUTES'
}

export type Jwt = {
  __typename?: 'JWT';
  expire_at?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAlbum?: Maybe<Album>;
  addArtist?: Maybe<Artist>;
  addSong?: Maybe<Song>;
  deleteAlbum?: Maybe<Scalars['Boolean']['output']>;
  deleteArtist?: Maybe<Scalars['Boolean']['output']>;
  deleteSongs?: Maybe<Scalars['Boolean']['output']>;
  likeSong?: Maybe<Scalars['Boolean']['output']>;
  unlikeSong?: Maybe<Scalars['Boolean']['output']>;
  updateAlbum?: Maybe<Album>;
  updateArtist?: Maybe<Artist>;
  updateSong?: Maybe<Song>;
};


export type MutationAddAlbumArgs = {
  input: AlbumCreateInput;
};


export type MutationAddArtistArgs = {
  input: ArtistCreateInput;
};


export type MutationAddSongArgs = {
  input: SongCreateInput;
};


export type MutationDeleteAlbumArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteArtistArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSongsArgs = {
  ids: Array<Scalars['Int']['input']>;
};


export type MutationLikeSongArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUnlikeSongArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateAlbumArgs = {
  albumArtistId: Scalars['Int']['input'];
  albumId: Scalars['Int']['input'];
  input: AlbumUpdateInput;
};


export type MutationUpdateArtistArgs = {
  input: ArtistUpdateInput;
};


export type MutationUpdateSongArgs = {
  input: SongUpdateInput;
  songId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  album?: Maybe<Album>;
  albums?: Maybe<Array<Maybe<Album>>>;
  artist?: Maybe<Artist>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  login?: Maybe<Jwt>;
  profile?: Maybe<ArtistUser>;
  song?: Maybe<Song>;
  songs?: Maybe<Array<Maybe<Song>>>;
};


export type QueryAlbumArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAlbumsArgs = {
  filter?: InputMaybe<AlbumFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryArtistArgs = {
  id: Scalars['Int']['input'];
};


export type QueryArtistsArgs = {
  filter?: InputMaybe<ArtistFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QuerySongArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySongsArgs = {
  filter?: InputMaybe<SongFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export enum ReleaseYear {
  Year_70 = 'YEAR_70',
  Year_80 = 'YEAR_80',
  Year_90 = 'YEAR_90',
  Year_2000 = 'YEAR_2000',
  Year_2010 = 'YEAR_2010'
}

export type Song = {
  __typename?: 'Song';
  artist?: Maybe<Artist>;
  artist_id?: Maybe<Scalars['Int']['output']>;
  cover?: Maybe<Scalars['String']['output']>;
  /** Duration in second */
  duration: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  like?: Maybe<Array<Maybe<ArtistLikeSong>>>;
  lyrics?: Maybe<Scalars['String']['output']>;
  nbLike?: Maybe<Scalars['Int']['output']>;
  release_year?: Maybe<Scalars['Int']['output']>;
  songOnAlbum?: Maybe<Array<Maybe<SongOnAlbum>>>;
  title: Scalars['String']['output'];
};

export type SongCreateInput = {
  artist_id?: InputMaybe<Scalars['Int']['input']>;
  cover?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Int']['input'];
  lyrics?: InputMaybe<Scalars['String']['input']>;
  release_year?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type SongFilterInput = {
  duration_filter?: InputMaybe<DurationRange>;
  liked?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SongOnAlbum = {
  __typename?: 'SongOnAlbum';
  album_id: Scalars['Int']['output'];
  position: Scalars['Int']['output'];
  song_id: Scalars['Int']['output'];
};

export type SongOnAlbumInput = {
  position: Scalars['Int']['input'];
  song_id: Scalars['Int']['input'];
};

export type SongUpdateInput = {
  cover?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  lyrics?: InputMaybe<Scalars['String']['input']>;
  release_year?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Album: ResolverTypeWrapper<Album>;
  AlbumCreateInput: AlbumCreateInput;
  AlbumFilterInput: AlbumFilterInput;
  AlbumUpdateInput: AlbumUpdateInput;
  Artist: ResolverTypeWrapper<Artist>;
  ArtistCreateInput: ArtistCreateInput;
  ArtistFilterInput: ArtistFilterInput;
  ArtistLikeSong: ResolverTypeWrapper<ArtistLikeSong>;
  ArtistUpdateInput: ArtistUpdateInput;
  ArtistUser: ResolverTypeWrapper<ArtistUser>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DurationRange: DurationRange;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JWT: ResolverTypeWrapper<Jwt>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ReleaseYear: ReleaseYear;
  Song: ResolverTypeWrapper<Song>;
  SongCreateInput: SongCreateInput;
  SongFilterInput: SongFilterInput;
  SongOnAlbum: ResolverTypeWrapper<SongOnAlbum>;
  SongOnAlbumInput: SongOnAlbumInput;
  SongUpdateInput: SongUpdateInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Album: Album;
  AlbumCreateInput: AlbumCreateInput;
  AlbumFilterInput: AlbumFilterInput;
  AlbumUpdateInput: AlbumUpdateInput;
  Artist: Artist;
  ArtistCreateInput: ArtistCreateInput;
  ArtistFilterInput: ArtistFilterInput;
  ArtistLikeSong: ArtistLikeSong;
  ArtistUpdateInput: ArtistUpdateInput;
  ArtistUser: ArtistUser;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  JWT: Jwt;
  LoginInput: LoginInput;
  Mutation: {};
  Query: {};
  Song: Song;
  SongCreateInput: SongCreateInput;
  SongFilterInput: SongFilterInput;
  SongOnAlbum: SongOnAlbum;
  SongOnAlbumInput: SongOnAlbumInput;
  SongUpdateInput: SongUpdateInput;
  String: Scalars['String']['output'];
};

export type AlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']> = {
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType>;
  artist_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  release_year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  songOnAlbum?: Resolver<Maybe<Array<Maybe<ResolversTypes['SongOnAlbum']>>>, ParentType, ContextType>;
  songs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistResolvers<ContextType = any, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
  albums?: Resolver<Maybe<Array<Maybe<ResolversTypes['Album']>>>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<Maybe<ResolversTypes['ArtistLikeSong']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  songs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistLikeSongResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtistLikeSong'] = ResolversParentTypes['ArtistLikeSong']> = {
  artist_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  song_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArtistUser'] = ResolversParentTypes['ArtistUser']> = {
  albums?: Resolver<Maybe<Array<Maybe<ResolversTypes['Album']>>>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JwtResolvers<ContextType = any, ParentType extends ResolversParentTypes['JWT'] = ResolversParentTypes['JWT']> = {
  expire_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addAlbum?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType, RequireFields<MutationAddAlbumArgs, 'input'>>;
  addArtist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<MutationAddArtistArgs, 'input'>>;
  addSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<MutationAddSongArgs, 'input'>>;
  deleteAlbum?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteAlbumArgs, 'id'>>;
  deleteArtist?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteArtistArgs, 'id'>>;
  deleteSongs?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteSongsArgs, 'ids'>>;
  likeSong?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationLikeSongArgs, 'id'>>;
  unlikeSong?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUnlikeSongArgs, 'id'>>;
  updateAlbum?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType, RequireFields<MutationUpdateAlbumArgs, 'albumArtistId' | 'albumId' | 'input'>>;
  updateArtist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<MutationUpdateArtistArgs, 'input'>>;
  updateSong?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<MutationUpdateSongArgs, 'input' | 'songId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType, RequireFields<QueryAlbumArgs, 'id'>>;
  albums?: Resolver<Maybe<Array<Maybe<ResolversTypes['Album']>>>, ParentType, ContextType, Partial<QueryAlbumsArgs>>;
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<QueryArtistArgs, 'id'>>;
  artists?: Resolver<Maybe<Array<Maybe<ResolversTypes['Artist']>>>, ParentType, ContextType, Partial<QueryArtistsArgs>>;
  login?: Resolver<Maybe<ResolversTypes['JWT']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'input'>>;
  profile?: Resolver<Maybe<ResolversTypes['ArtistUser']>, ParentType, ContextType>;
  song?: Resolver<Maybe<ResolversTypes['Song']>, ParentType, ContextType, RequireFields<QuerySongArgs, 'id'>>;
  songs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Song']>>>, ParentType, ContextType, Partial<QuerySongsArgs>>;
};

export type SongResolvers<ContextType = any, ParentType extends ResolversParentTypes['Song'] = ResolversParentTypes['Song']> = {
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType>;
  artist_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isLiked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  like?: Resolver<Maybe<Array<Maybe<ResolversTypes['ArtistLikeSong']>>>, ParentType, ContextType>;
  lyrics?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nbLike?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  release_year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  songOnAlbum?: Resolver<Maybe<Array<Maybe<ResolversTypes['SongOnAlbum']>>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SongOnAlbumResolvers<ContextType = any, ParentType extends ResolversParentTypes['SongOnAlbum'] = ResolversParentTypes['SongOnAlbum']> = {
  album_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  song_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Album?: AlbumResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  ArtistLikeSong?: ArtistLikeSongResolvers<ContextType>;
  ArtistUser?: ArtistUserResolvers<ContextType>;
  JWT?: JwtResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Song?: SongResolvers<ContextType>;
  SongOnAlbum?: SongOnAlbumResolvers<ContextType>;
};

