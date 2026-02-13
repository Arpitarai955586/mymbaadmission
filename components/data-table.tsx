"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";
import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddNewBlogModal } from "@/components/add-new-blog-modal";
import { AddNewCollegeModal } from "@/components/add-new-college-modal";
import { AddNewExamModal } from "@/components/add-new-exam-modal";
import { EditBlogModal } from "@/components/edit-blog-modal";
import { EditCollegeModal } from "@/components/edit-college-modal";
import { EditExamModal } from "@/components/edit-exam-modal";
import {AddNewCourseModal} from "@/components/add-new-course-modal"
import {EditCourseModal } from "@/components/edit-course-modal";


export const schema = z.object({
  id: z.string(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Section Type",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "Done" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "target",
    header: () => <div className="w-full text-right">Target</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          Target
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
  },
  {
    accessorKey: "limit",
    header: () => <div className="w-full text-right">Limit</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
          Limit
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.limit}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer";

      if (isAssigned) {
        return row.original.reviewer;
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
              <SelectItem value="Jamik Tashpulatov">
                Jamik Tashpulatov
              </SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// // Sample data for Blogs tab
// const initialBlogsData = [
//   {
//     id: 1,
//     title: "MBA Admission Guide 2024",
//     category: "Admissions",
//     author: "John Doe",
//     status: "Published",
//     publishedDate: "2024-01-15",
//     imageUrl: "https://example.com/image1.jpg",
//     description: "Complete guide for MBA admissions",
//     readTime: "5 min"
//   },
//   {
//     id: 2,
//     title: "Top MBA Colleges in India",
//     category: "Colleges",
//     author: "Jane Smith",
//     status: "Draft",
//     publishedDate: "2024-01-20",
//     imageUrl: "https://example.com/image2.jpg",
//     description: "List of top MBA colleges",
//     readTime: "3 min"
//   },
//   {
//     id: 3,
//     title: "CAT Exam Preparation Tips",
//     category: "Exams",
//     author: "Mike Johnson",
//     status: "Published",
//     publishedDate: "2024-01-10",
//     imageUrl: "https://example.com/image3.jpg",
//     description: "Tips for CAT exam preparation",
//     readTime: "7 min"
//   }
// ]

// Sample data for Exams tab
// const initialExamsData = [
//   {
//     id: 1,
//     name: "CAT 2024",
//     category: "MBA Entrance",
//     date: "2024-11-24",
//     duration: "2 hours",
//     status: "Upcoming",
//     description: "Common Admission Test for MBA",
//     eligibility: "Graduate with 50% marks"
//   },
//   {
//     id: 2,
//     name: "XAT 2024",
//     category: "MBA Entrance",
//     date: "2024-01-07",
//     duration: "3 hours",
//     status: "Completed",
//     description: "Xavier Aptitude Test",
//     eligibility: "Graduate with 50% marks"
//   },
//   {
//     id: 3,
//     name: "GMAT 2024",
//     category: "International MBA",
//     date: "2024-02-15",
//     duration: "3.5 hours",
//     status: "Active",
//     description: "Graduate Management Admission Test",
//     eligibility: "Graduate with good academic record"
//   }
// ]

// Sample data for Colleges tab
// const initialCollegesData = [
//   {
//     id: 1,
//     name: "IIM Ahmedabad",
//     type: "Government",
//     location: "Ahmedabad, Gujarat",
//     ranking: "#1 in India",
//     establishedYear: "1961",
//     website: "https://www.iimahd.ernet.in/",
//     description: "Premier management institute in India"
//   },
//   {
//     id: 2,
//     name: "IIM Bangalore",
//     type: "Government",
//     location: "Bangalore, Karnataka",
//     ranking: "#2 in India",
//     establishedYear: "1973",
//     website: "https://www.iimb.ac.in/",
//     description: "Top management institute with global recognition"
//   },
//   {
//     id: 3,
//     name: "XLRI Xavier School of Management",
//     type: "Private",
//     location: "Jamshedpur, Jharkhand",
//     ranking: "#3 in India",
//     establishedYear: "1949",
//     website: "https://www.xlri.ac.in/",
//     description: "Leading private management school"
//   }
// ]

// Define the data structures that match our tables
interface BlogData {
  id: number;
  title: string;
  category: string;
  author: string;
  status: string;
  publishedDate: string;
  imageUrl: string;
  description: string;
  readTime: string;
}

interface CollegeData {
  id: string;
  name: string;
  type: string;
  location: {
    city: string;
    state: string;
  };
  ranking: string;
  establishedYear: number;
  website: string;
  description: string;
}

interface ExamData {
  id: number;
  name: string;
  category: string;
  date: string;
  duration: string;
  status: string;
  description: string;
  eligibility: string;
}
interface CourseData {
  id: string;
  name: string;
  slug: string;
  duration_years: number;
  degree: string;
  total_fee: number;
  status: string;
}


export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [initialBlogsData, setInitialBlogsData] = React.useState<BlogData[]>(
    [],
  );
  const [initialCollegesData, setInitialCollegesData] = React.useState<
    CollegeData[]
  >([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [activeTab, setActiveTab] = React.useState("outline");
  const [blogsData, setBlogsData] = React.useState(initialBlogsData);
  const [collegesData, setCollegesData] = React.useState(initialCollegesData);
  const [initialExamsData, setInitialExamsData] = React.useState<ExamData[]>(
    [],
  );
  const [examsData, setExamsData] = React.useState(initialExamsData);
  const [isBlogModalOpen, setIsBlogModalOpen] = React.useState(false);
  const [isCollegeModalOpen, setIsCollegeModalOpen] = React.useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = React.useState(false);
  const [isEditBlogModalOpen, setIsEditBlogModalOpen] = React.useState(false);
  const [isEditCollegeModalOpen, setIsEditCollegeModalOpen] =
    React.useState(false);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = React.useState(false);
  const [selectedBlog, setSelectedBlog] = React.useState<BlogData | null>(null);
  const [selectedCollege, setSelectedCollege] =
    React.useState<CollegeData | null>(null);
  const [selectedExam, setSelectedExam] = React.useState<ExamData | null>(null);
  const sortableId = React.useId();
const [initialCoursesData, setInitialCoursesData] = React.useState<CourseData[]>([]);
const [coursesData, setCoursesData] = React.useState(initialCoursesData);
const [isCourseModalOpen, setIsCourseModalOpen] = React.useState(false);
const [isEditCourseModalOpen, setIsEditCourseModalOpen] = React.useState(false);
const [selectedCourse, setSelectedCourse] = React.useState<CourseData | null>(null);

  React.useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs?page=1&limit=100");
        const data = await res.json();

        if (data.success) {
          const blogs = data.blogs.map((blog: any) => ({
            id: blog._id, // ✅ real DB id
            title: blog.title,
            category: blog.category || "General",
            author: blog.author || "Admin",
            status: blog.is_published ? "Published" : "Draft",
            publishedDate: blog.created_at,
            imageUrl: blog.image,
            description: blog.body,
            readTime: blog.read_time || "5 min",
          }));

          setBlogsData(blogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []); // ❌ remove initialBlogsData dependency

  const handleAddBlog = (blog: any) => {
    const newBlog = {
      id: blog._id,
      title: blog.title,
      category: blog.category || "General",
      author: "Admin",
      status: blog.is_published ? "Published" : "Draft",
      publishedDate: blog.created_at,
      imageUrl: blog.image,
      description: blog.body,
      readTime: "5 min",
    };

    setBlogsData((prev) => [newBlog, ...prev]);
  };
  const handleAddCourse = (course: any) => {
  const newCourse: CourseData = {
    id: course._id,
    name: course.name,
    slug: course.slug,
    duration_years: course.duration_years,
    degree: course.degree,
    total_fee: course.default_fees?.total_fee || 0,
    status: course.status,
  };

  setCoursesData((prev) => [newCourse, ...prev]);
};





  React.useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("/api/colleges?page=1&limit=100");
        const data = await res.json();
        if (data.success) {
          const colleges = data.colleges.map((college: any) => ({
            id: college._id, // ✅ real DB id
            name: college.name,
            type: college.type,
            location: {
              city: college.location?.city,
              state: college.location?.state,
            },

            ranking: college.ranking || "TBD",
            establishedYear: college.established_year || 0,
            website: college.website || "TBD",
            description: college.overview || "TBD",
          }));
          setCollegesData(colleges);
        }
      } catch (error) {
        console.error("Failed to fetch colleges:", error);
      }
    };
    fetchColleges();
  }, []); // ❌ remove initialCollegesData dependency
  const handleAddCollege = (collegeData: any) => {
    const newCollege: CollegeData = {
      id: collegeData.id || collegesData.length + 1,
      name: collegeData.name,
      type: collegeData.type,
      location: collegeData.location,
      ranking: collegeData.ranking,
      establishedYear: collegeData.establishedYear,
      website: collegeData.website,
      description: collegeData.description,
    };
    setCollegesData((prev) => [...prev, newCollege]);
  };
  

  React.useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch("/api/exams?page=1&limit=100");

        if (!res.ok) {
          throw new Error("Failed to fetch exams");
        }

        const data = await res.json();

        if (data.success) {
          const exams = data.exams.map((exam: any) => ({
            id: exam._id,
            name: exam.name,
            category: exam.category,
            date: exam.date,
            duration: exam.duration,
            status: exam.status,
            description: exam.description,
            eligibility: exam.eligibility,
          }));

          setExamsData(exams);
        }
      } catch (error) {
        console.error("ERROR FETCHING EXAMS:", error);
      }
    };

    fetchExams();
  }, []);

  React.useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses?page=1&limit=100");

      if (!res.ok) throw new Error("Failed to fetch courses");

      const data = await res.json();

      if (data.success) {
       const courses = data.courses.map((course: any) => ({
  id: course._id,
  name: course.name,
  slug: course.slug,
  duration_years: course.duration_years,
  degree: course.degree,
  total_fee: course.default_fees?.total_fee || 0,
  status: course.status,
}));


        setCoursesData(courses);
      }
    } catch (error) {
      console.error("ERROR FETCHING COURSES:", error);
    }
  };

  fetchCourses();
}, []);


  const handleAddExam = (examData: ExamData) => {
    const newExam = {
      id: examsData.length + 1,
      name: examData.name,
      category: examData.category,
      date: examData.date,
      duration: examData.duration,
      status: examData.status,
      description: examData.description,
      eligibility: examData.eligibility,
    };
    setExamsData((prev) => [...prev, newExam]);
  };

  const handleEditBlog = async (blog: BlogData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    try {
      const payload = {
        title: blog.title,
        slug:
          blog.slug ||
          blog.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
        body: blog.body || blog.description,
        category: blog.category || "General",
        image: blog.imageUrl || null,
        is_published: blog.status === "Published",
      };

      const res = await fetch(`/api/blogs/${blog.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.warn("Response is not valid JSON:", text);
      }

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update blog");
      }

      const updatedBlog: BlogData = {
        id: data.blog._id,
        title: data.blog.title,
        category: data.blog.category || "General",
        author: data.blog.author || "Admin",
        status: data.blog.is_published ? "Published" : "Draft",
        publishedDate: data.blog.updated_at ?? data.blog.created_at,
        imageUrl: data.blog.image || "",
        description: data.blog.body || "",
        readTime: data.blog.read_time || blog.readTime || "5 min",
      };

      setBlogsData((prev) =>
        prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      );
    } catch (err: any) {
      console.error("❌ Failed to edit blog:", err);
      alert(err.message);
    }
  };

  const handleEditCollege = async (college: CollegeData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    try {
      const payload = {
        name: college.name,
        type: college.type,
        location: college.location,
        ranking: college.ranking,
        established_year: Number(college.establishedYear),
        website: college.website,
        content: {
          overview: college.description,
        },
      };

      const res = await fetch(`/api/colleges/${college.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update college");
      }

      const updatedCollege: CollegeData = {
        id: data.college._id,
        name: data.college.name,
        type: data.college.type,
        location: data.college.location,
        ranking: data.college.ranking,
        establishedYear: data.college.established_year,
        website: data.college.website,
        description: data.college.content?.overview || "",
      };

      setCollegesData((prev) =>
        prev.map((c) => (c.id === updatedCollege.id ? updatedCollege : c)),
      );
    } catch (err: any) {
      console.error("❌ Failed to edit college:", err);
      alert(err.message);
    }
  };

  const handleEditExam = async (exam: ExamData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    try {
      const payload = {
        name: exam.name,
        category: exam.category,
        date: exam.date,
        duration: exam.duration,
        status: exam.status,
        description: exam.description,
        eligibility: exam.eligibility,
      };

      const res = await fetch(`/api/exams/${exam.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        throw new Error(data?.message || "Failed to update exam");
      }

      const updatedExam = data.exam;

      // ✅ UI sync with DB response
      setExamsData((prev) =>
        prev.map((e) => (e.id === updatedExam._id ? updatedExam : e)),
      );
    } catch (err: any) {
      console.error("❌ Failed to edit exam:", err);
      alert(err.message);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete blog");
      }

      // ✅ remove from UI after backend success
      setBlogsData((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      console.error("❌ Failed to delete blog:", err);
      alert(err.message);
    }
  };

  const handleDeleteCollege = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    const confirmDelete = confirm(
      "Are you sure you want to deactivate this college?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/colleges/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        throw new Error(data?.message || "Failed to delete college");
      }

      // ✅ remove from UI after backend success
      setCollegesData((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      console.error("❌ Failed to delete college:", err);
      alert(err.message);
    }
  };

  const handleDeleteExam = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not logged in");
    return;
  }

  const confirmDelete = confirm(
    "Are you sure you want to delete this exam?"
  );
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/exams/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to delete exam");
    }

    setExamsData((prev) => prev.filter((e) => e.id !== id));
  } catch (err: any) {
    console.error("❌ Failed to delete exam:", err);
    alert(err.message);
  }
};

  const handleEditCourse = async (course: CourseData) => {
  const token = localStorage.getItem("token");
  if (!token) return alert("You are not logged in");

  try {
    const payload = {
      name: course.name,
      slug: course.slug,
      duration_years: course.duration_years,
      degree: course.degree,
      default_fees: {
        currency: "INR",
        total_fee: course.total_fee,
      },
      status: course.status,
    };

    const res = await fetch(`/api/courses/${course.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message);

    setCoursesData((prev) =>
      prev.map((c) => (c.id === course.id ? course : c))
    );
  } catch (err: any) {
    alert(err.message);
  }
};

const handleDeleteCourse = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not logged in");
    return;
  }

  if (!confirm("Are you sure you want to delete this course?")) return;

  try {
    const res = await fetch(`/api/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete course");

    setCoursesData((prev) => prev.filter((c) => c.id !== id));
  } catch (err: any) {
    console.error("❌ Failed to delete course:", err);
    alert(err.message);
  }
};


  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>



        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">College</TabsTrigger>
          <TabsTrigger value="past-performance">Blogs</TabsTrigger>
          <TabsTrigger value="key-personnel">Exams</TabsTrigger>
          <TabsTrigger value="key-personnel1">Courses</TabsTrigger>
          {/* <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger> */}
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide(),
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (activeTab === "past-performance") setIsBlogModalOpen(true);
              if (activeTab === "outline") setIsCollegeModalOpen(true);
              if (activeTab === "key-personnel") setIsExamModalOpen(true);
              if (activeTab === "key-personnel1") {
  if (!selectedCollege) {
    alert("Please select a college first");
    return;
  }
  setIsCourseModalOpen(true);
}

            }}
          >
            <IconPlus />
            <span className="hidden lg:inline">
              {activeTab === "outline" && "Add College"}
              {activeTab === "past-performance" && "Add Blog"}
              {activeTab === "key-personnel" && "Add Exam"}
              {activeTab === "key-personnel1" && "Add Courses"}
              {activeTab === "focus-documents" && "Add Document"}
            </span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>College Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Ranking</TableHead>
                <TableHead>Established Year</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collegesData.length > 0 ? (
                collegesData.map((college) => (
                  <TableRow key={college.id}>
                    <TableCell className="font-medium">
                      {college.name}
                    </TableCell>
                    <TableCell>{college.type}</TableCell>
                    <TableCell>
                      {college.location?.city}, {college.location?.state}
                    </TableCell>

                    <TableCell>{college.ranking}</TableCell>
                    <TableCell>{college.establishedYear}</TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCollege(college);
                           
                            setIsEditCollegeModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCollege(college.id)}
                        >
                          Delete
                        </Button>
                        <Button
  variant="secondary"
  size="sm"
  onClick={() => {
    setSelectedCollege(college);
    setActiveTab("key-personnel1"); // switch to courses tab
  }}
>
  View Courses
</Button>

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No colleges found. Click "Add College" to create a new
                    college.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogsData.length > 0 ? (
                blogsData.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          blog.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </TableCell>
                    <TableCell>{blog.publishedDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedBlog(blog);
                            setIsEditBlogModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBlog(blog.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No blogs found. Click "Add Section" to create a new blog.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent
        value="key-personnel"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>Exam Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examsData.length > 0 ? (
                examsData.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.name}</TableCell>
                    <TableCell>{exam.category}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>{exam.duration}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          exam.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : exam.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {exam.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedExam(exam);
                            setIsEditExamModalOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteExam(exam.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No exams found. Click "Add Section" to create a new exam.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
 <TabsContent
  value="key-personnel1"
  className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
>
  <div className="overflow-hidden rounded-lg border">
    <Table>
      <TableHeader className="bg-muted sticky top-0 z-10">
        <TableRow>
          <TableHead>Course Name</TableHead>
          <TableHead>Level</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Fees</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {coursesData.length > 0 ? (
          coursesData.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">
                {course.name}
              </TableCell>
              <TableCell>{course.degree}</TableCell>
              <TableCell>{course.duration_years} Years</TableCell>
                <TableCell>₹{course.total_fee}</TableCell>
              <TableCell>{course.status}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCourse(course);
                      setIsEditCourseModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No courses found. Click "Add Course" to create one.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
</TabsContent>


      <AddNewBlogModal
        isOpen={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
        onAddBlog={handleAddBlog}
      />
      <AddNewCollegeModal
        isOpen={isCollegeModalOpen}
        onClose={() => setIsCollegeModalOpen(false)}
        onAddCollege={handleAddCollege}
      />
      <AddNewExamModal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        onAddExam={handleAddExam}
      />
      <EditBlogModal
        isOpen={isEditBlogModalOpen}
        onClose={() => setIsEditBlogModalOpen(false)}
        onEditBlog={handleEditBlog}
        blog={selectedBlog}
      />
      <EditCollegeModal
        isOpen={isEditCollegeModalOpen}
        onClose={() => setIsEditCollegeModalOpen(false)}
        onEditCollege={handleEditCollege}
        college={selectedCollege}
      />
      <EditExamModal
        isOpen={isEditExamModalOpen}
        onClose={() => setIsEditExamModalOpen(false)}
        onEditExam={handleEditExam}
        exam={selectedExam}
      />

      <AddNewCourseModal
  isOpen={isCourseModalOpen}
  onClose={() => setIsCourseModalOpen(false)}
  onAddCourse={handleAddCourse}
   collegeId={selectedCollege?.id || ""} 
/>

<EditCourseModal
  isOpen={isEditCourseModalOpen}
  onClose={() => setIsEditCourseModalOpen(false)}
  onEditCourse={handleEditCourse}
  course={selectedCourse}
/>

    </Tabs>
  );
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      Table of Contents
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
