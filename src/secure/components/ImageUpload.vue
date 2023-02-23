<template>
    <label class="btn btn-primary">
        Upload <input type="file" hidden @change="upload($event.target.files)"/>
    </label>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: "ImageUpload",
    emits: ['file-uploaded'],
    setup(_, context) {
        const upload = async (files: FileList) => {
            const file = files.item(0);

            const data = new FormData;
            data.append('image', file);

            const response = await axios.post('upload', data);
            
            // emite para a página de destino a url da imagem que foi carregada
            context.emit('file-uploaded', response.data.url);
        }

        return {
            upload
        }
    }
}
</script>