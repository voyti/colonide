var TextWebGLRenderer = function (renderer, src, interpolationPercentage, camera)
{
    if (this.renderMask !== this.renderFlags)
    {
        return;
    }
    
    if (src.dirty)
    {
        src.canvasTexture = renderer.uploadCanvasToGPU(src.canvas, src.canvasTexture, true);
        src.dirty = false;
    }

    renderer.spriteBatch.addSpriteTexture(src, camera, src.canvasTexture, src.canvas.width, src.canvas.height);
};

module.exports = TextWebGLRenderer;
