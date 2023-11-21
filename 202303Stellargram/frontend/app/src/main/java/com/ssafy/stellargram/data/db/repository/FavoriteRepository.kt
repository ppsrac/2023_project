package com.ssafy.stellargram.data.db.repository

import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class FavoriteRepository @Inject constructor(private val favoriteDao: FavoriteDAO) {
    fun readAll(): Flow<List<Favorite>> {
        return favoriteDao.readAll()
    }

    suspend fun addFavorite(favorite: Favorite) {
        favoriteDao.addFavorite(favorite)
    }

    suspend fun deleteFavorite(favorite: Favorite) {
        favoriteDao.deleteFavorite(favorite)
    }
}
