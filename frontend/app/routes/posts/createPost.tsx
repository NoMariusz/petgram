import CreatePostForm from '~/components/posts/CreatePostForm';
import LoggedContainer from '~/components/shared/LoggedContainer';

export default function CreatePost() {
  return (
    <LoggedContainer activeItem="add">
      <section className="rounded-[30px] bg-[#FFFEFB] p-8 shadow-[0_12px_32px_rgba(48,51,48,0.06)] md:p-10">
        <div className="mb-8">
          <p className="mt-2 max-w-2xl text-[22px] leading-6 text-black font-bold">Create a post</p>
        </div>

        <CreatePostForm />
      </section>
    </LoggedContainer>
  );
}
