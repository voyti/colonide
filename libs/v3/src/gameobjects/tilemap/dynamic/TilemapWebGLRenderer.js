var TilemapWebGLRenderer = function (renderer, gameObject, interpolationPercentage, camera)
{
    if (this.renderMask !== this.renderFlags)
    {
        return;
    }

    this.cull(camera);

    var renderTiles = gameObject.culledTiles;
    var length = renderTiles.length;
    var batch = renderer.spriteBatch;
    var texture = gameObject.texture.source[0].glTexture;
    var textureWidth = texture.width;
    var textureHeight = texture.height;
    var renderTarget = gameObject.renderTarget;
    var scrollFactorX = gameObject.scrollFactorX;
    var scrollFactorY = gameObject.scrollFactorY;
    var alpha = gameObject.alpha;
    var x = gameObject.x;
    var y = gameObject.y;

    for (var index = 0; index < length; ++index)
    {
        var tile = renderTiles[index];
        batch.addTileTextureRect(
            texture,
            x + tile.x, y + tile.y, tile.width, tile.height, alpha * tile.alpha, tile.tint,
            scrollFactorX, scrollFactorY,
            textureWidth, textureHeight,
            tile.frameX, tile.frameY, tile.frameWidth, tile.frameHeight,
            camera,
            renderTarget
        );
    }
};

module.exports = TilemapWebGLRenderer;
