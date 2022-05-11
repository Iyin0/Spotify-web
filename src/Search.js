import { useState } from "react";
import FetchData from "./FetchData";
import { BsSearch } from "react-icons/bs"
import convert from "./convert";
import Footer from "./Footer";

const Search = () => {

    const [searchKey, setSearchKey] = useState("");
    const type = ["artist", "track", "album", "playlist", "show", "episode"]
    const artist_uri = `https://api.spotify.com/v1/search?q=${searchKey}&type=${type}&limit=8`;
    const {data: result, fetching, error, status} = FetchData(artist_uri)
    const {data: categories, fetching: getting_categories, error: error_categories} = FetchData("https://api.spotify.com/v1/browse/categories?limit=45")

    // const searchArtist = (e) => {
    //     e.preventDefault();
    //     // console.log(result)
    //     console.log(categories)
    // }

    return ( 
        <div className="search-page">
            {/* <TopNavbar/> */}
            <div className="search-form">
                <BsSearch className="search icon"/>
                <input type="text" onChange={e => setSearchKey(e.target.value)} placeholder = "Artists, songs, or podcasts"/>
            </div>
            {searchKey.length ? (
                <div>
                {fetching && <div>Loading...</div>}
                {result && (
                    <div className="top-result">
                        {/* {console.log(result)} */}
                        <div className="top-result-left">
                            <div className="top-header">Top Result</div>
                                <div className="top-artists">
                                    <div className="top-artist">
                                        <img src={result.artists.items[0].images[0].url} alt="" />
                                        <div className="top-artist-name">{result.artists.items[0].name}</div>
                                        <div className="top-artist-type">{result.artists.items[0].type.toUpperCase()}</div>
                                    </div>
                                </div>
                        </div>
                        <div className="top-result-right">
                            <div className="headers">
                                <div className="top-header">Songs</div>
                                <div className="see-all">SEE ALL</div>
                            </div>
                            <div className="top-tracks">
                                <div className="top-track">
                                    <div className="top-track-image"><img src={result.tracks.items[0].album.images[0].url} alt="" /></div>
                                    <div className="top-track-details">
                                        <div className="track-name">{result.tracks.items[0].name}</div>
                                        <div className="artist-name">{result.tracks.items[0].artists[0].name}</div>
                                    </div>
                                    <div className="top-track-duration">{convert(Math.floor(result.tracks.items[0].duration_ms/1000))}</div>
                                </div>
                                <div className="top-track">
                                    <div className="top-track-image"><img src={result.tracks.items[1].album.images[0].url} alt="" /></div>
                                    <div className="top-track-details">
                                        <div className="track-name">{result.tracks.items[1].name}</div>
                                        <div className="artist-name">{result.tracks.items[1].artists[0].name}</div>
                                    </div>
                                    <div className="top-track-duration">{convert(Math.floor(result.tracks.items[1].duration_ms/1000))}</div>
                                </div>
                                <div className="top-track">
                                    <div className="top-track-image"><img src={result.tracks.items[2].album.images[0].url} alt="" /></div>
                                    <div className="top-track-details">
                                        <div className="track-name">{result.tracks.items[2].name}</div>
                                        <div className="artist-name">{result.tracks.items[2].artists[0].name}</div>
                                    </div>
                                    <div className="top-track-duration">{convert(Math.floor(result.tracks.items[2].duration_ms/1000))}</div>
                                </div>
                                <div className="top-track">
                                    <div className="top-track-image"><img src={result.tracks.items[3].album.images[0].url} alt="" /></div>
                                    <div className="top-track-details">
                                        <div className="track-name">{result.tracks.items[3].name}</div>
                                        <div className="artist-name">{result.tracks.items[3].artists[0].name}</div>
                                    </div>
                                    <div className="top-track-duration">{convert(Math.floor(result.tracks.items[3].duration_ms/1000))}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {result && (
                    <div className="search-playlist bowl">
                        <div className="header">
                            <b className="heading">Featuring {result.artists.items[0].name}</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            <div className="playlists_list view">
                                <div>{result.playlists.items[1].images.length ? <img src={result.playlists.items[1].images[0].url} alt=""/> : <div>No Image</div>}</div>
                                <div className="details">{result.playlists.items[1].name}</div>
                            </div>
                            <div className="playlists_list view">
                                <div>{result.playlists.items[5].images.length ? <img src={result.playlists.items[5].images[0].url} alt=""/> : <div>No Image</div>}</div>
                                <div className="details">{result.playlists.items[5].name}</div>
                            </div>
                        </div>
                    </div>
                )}
                {result && (
                    <div className="search-artist bowl">
                        <div className="header">
                            <b className="heading">Artists</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {result.artists.items.map(artist => (
                            <div className="artists_list view" key={artist.id}>
                                <div>{artist.images.length ? <img src={artist.images[0].url} alt=""/> : <div>No Image</div>}</div>
                                <div className="details">{artist.name}</div>
                                <div className="details">{artist.type.charAt(0).toUpperCase() + artist.type.slice(1)}</div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}
                {result && (
                    <div className="search-album bowl">
                        <div className="header">
                            <b className="heading">Albums</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {result.albums.items.map(album => (
                            <div className="albums_list view" key={album.id}>
                                <div>{album.images.length ? <img src={album.images[0].url} alt=""/> : <div>No Image</div>}</div>
                                <div className="details">{album.name}</div>
                                {album.artists.map(artists => {
                                    <div className="details">{artists.name}</div>
                                })}
                            </div>
                            ))}
                        </div>
                    </div>
                )}
                {result && (
                    <div className="search-playlist bowl">
                        <div className="header">
                            <b className="heading">Playlists</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {result.playlists.items.map(playlist => (
                            <div className="playlists_list view" key={playlist.id}>
                                <div>{playlist.images.length ? <img src={playlist.images[0].url} alt=""/> : <div>No Image</div>}</div>
                                <div className="details">{playlist.name}</div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}
                {result && (
                    <div className="search-podcast bowl">
                        <div className="header">
                            <b className="heading">Podcast</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {result && result.shows.items.map(show => (
                            <div className="shows_list view" key={show.id}>
                                <div>{show.images.length ? <img src={show.images[0].url} alt=""/> : <div>No Image</div>}</div>
                                <div className="details">{show.name}</div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}
                {result && (
                    <div className="search-episodes bowl">
                        <div className="header">
                            <b className="heading">Episodes</b>
                            <div>SEE ALL</div>
                        </div>
                        <div className="container">
                            {result && result.episodes.items.map(episode => (
                            <div className="episodes_list view" key={episode.id}>
                                <div>{episode.images.length ? <img src={episode.images[0].url} alt=""/> : <div>No Image</div>}</div>
                                <div className="details">{episode.name}</div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}
                </div>
            ) : (
                <div>
                    {getting_categories && <div className="waiting"></div>}
                    {error_categories && <div className="waiting"></div>}
                    {categories && (
                        <div className="categories bowl">
                            <div className="header">
                                <b className="heading">Browse all</b>
                            </div>
                            <div className="category-container">
                                {categories && categories.categories.items.map((category) => (
                                    <div className="category" key={category.id}>
                                        <img src={category.icons[0].url} alt="" className="cover"/>
                                        <div className="image-text">{category.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            <Footer/>
            
        </div>
     );
}
 
export default Search;